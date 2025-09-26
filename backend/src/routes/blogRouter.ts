import { Hono } from "hono";
import { createPrismaClient } from "../../prisma/Client";
import { authMiddleware } from "../blogMiddleware";
import { createPostInput, updatePostInput } from "@krohit8/blog-common";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", authMiddleware);

blogRouter.post("/", async (c) => {
  const userId = c.get("userId");
  const prisma = createPrismaClient(c.env.DATABASE_URL);
  const body = await c.req.json();
  const { success } = createPostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });
  return c.json({
    id: post.id,
  });
});

blogRouter.put("/", async (c) => {
  const userId = c.get("userId");
  const prisma = createPrismaClient(c.env.DATABASE_URL);
  const body = await c.req.json();
  const { success } = updatePostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }
  await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      ...(body.title && { title: body.title }),
      ...(body.content && { content: body.content }),
    },
  });
  return c.text("post updated");
});

blogRouter.get("/bulk", async (c) => {
  const prisma = createPrismaClient(c.env.DATABASE_URL);
  const post = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return c.json(post);
});

blogRouter.get("/:id", async (c) => {
  const prisma = createPrismaClient(c.env.DATABASE_URL);
  const id = c.req.param("id");
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  return c.json(post);
});
