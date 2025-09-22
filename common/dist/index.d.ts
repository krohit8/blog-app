import z from "zod";
export declare const signUpInput: z.ZodObject<{
    email: z.ZodEmail;
    name: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
}, z.z.core.$strip>;
export type signUpType = z.infer<typeof signUpInput>;
export declare const signInInput: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.z.core.$strip>;
export type signInType = z.infer<typeof signUpInput>;
export declare const createPostInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, z.z.core.$strip>;
export type createPostType = z.infer<typeof signUpInput>;
export declare const updatePostInput: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, z.z.core.$strip>;
export type updatePostType = z.infer<typeof signUpInput>;
//# sourceMappingURL=index.d.ts.map