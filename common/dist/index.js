import z from "zod";
export const signUpInput = z.object({
    email: z.email(),
    name: z.string().optional(),
    password: z.string(),
});
export const signInInput = z.object({
    email: z.email(),
    password: z.string(),
});
export const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
});
export const updatePostInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
});
//# sourceMappingURL=index.js.map