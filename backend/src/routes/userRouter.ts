import { Hono } from "hono";
import { sign } from "hono/jwt";
import { createPrismaClient } from "../../prisma/Client";
import bcrypt from "bcryptjs";
import { signInInput, signUpInput } from "@krohit8/blog-common";
import { authMiddleware } from "../blogMiddleware";
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = createPrismaClient(c.env.DATABASE_URL);
  const body = await c.req.json();
  const { success } = signUpInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (error) {
    console.error("Signup error:", error);
    c.status(403);
    return c.json({ error: "User already exists or database error" });
  }
});

userRouter.post("/signin", async (c) => {
  try {
    const prisma = createPrismaClient(c.env.DATABASE_URL);
    const body = await c.req.json();
    const { success } = signInInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
      select:{
        id:true,
        password:true
      }
    });
    const passwordToCompare = user?.password || "$2a$10$FakeHashToPreventTimingAttacks1234567890";
    const isValidPassword = await bcrypt.compare(body.password, passwordToCompare)
    if (!user || !isValidPassword) {
      c.status(401);
      return c.json({ error: "Invalid email or password" });
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (error) {
    console.error("Signin error:", error);
    c.status(500);
    return c.json({
      error: "Internal server error",
    });
  }
});

userRouter.get("/me", authMiddleware, async (c) => {
  const prisma = createPrismaClient(c.env.DATABASE_URL);
  const userId = c.get("userId");
  if (!userId) {
    c.status(401);
    return c.json({ message: "unauthorized" });
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      id: true,
    },
  });
  if (!user) {
    c.status(404);
    return c.json({ error: "User not found" });
  }
  return c.json({ user });
});
