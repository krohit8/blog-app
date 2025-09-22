import { verify } from "hono/jwt";

export const authMiddleware = async (c: any, next: any) => {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;
    const payload = await verify(token, c.env.JWT_SECRET);

    if (!payload || !payload.id) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
    c.set("userId", payload.id as string);
    await next();
  } catch (error) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
};
