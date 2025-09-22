import z from "zod";

export const signUpInput = z.object({
  email: z.email(),
  name: z.string().optional(),
  password: z.string(),
});
export type signUpType = z.infer<typeof signUpInput>;

export const signInInput = z.object({
  email: z.email(),
  password: z.string(),
});
export type signInType = z.infer<typeof signUpInput>;

export const createPostInput = z.object({
  title: z.string(),
  content: z.string(),
});
export type createPostType = z.infer<typeof signUpInput>;

export const updatePostInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});
export type updatePostType = z.infer<typeof signUpInput>;
