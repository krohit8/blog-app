import { Context, Next } from "hono";


export const limiter = async(c: Context, next: Next ) => {
  const rateLimiter = c.env.RATE_LIMITER;
  const userId = c.get("userId");
  
  const key = userId 
    ? `user:${userId}` 
    : `ip:${c.req.header("cf-connecting-ip") || "unknown"}`;
  
  const { success } = await rateLimiter.limit({ key })
  
  if(!success){
    return c.json({
      error:"Too many requests",
      message:"Please wait before trying again"
    },429)
  }
  
  await next()
}
