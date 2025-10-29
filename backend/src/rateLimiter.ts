import { rateLimiter } from "hono-rate-limiter";

export const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  keyGenerator: (c) => {
    return c.req.header("cf-connecting-ip") || "unknown";
  },
  handler: (c) => {
    return c.json(
      {
        error: "Too many request",
        message: "Please slow down",
      },
      429
    );
  },
});
