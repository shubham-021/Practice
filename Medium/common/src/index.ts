import z from "zod/v4"

//signUp
export const signupInput = z.object({
    email : z.email(),
    password : z.string().min(6)
    // name : z.string().optional()
})

//signIn
export const signinInput = z.object({
    email : z.email(),
    password : z.string().min(6)
})

// createBlog
export const createBlogInput = z.object({
    title : z.string(),
    content : z.string(),  
})

// updateBlog 
export const updateBlogInput = z.object({
    title : z.string(),
    content : z.string(), 
    id : z.string() 
})

export type signupInput = z.infer<typeof signupInput>
export type signinInput = z.infer<typeof signinInput>
export type createBlogInput = z.infer<typeof createBlogInput>
export type updateBlogInput = z.infer<typeof updateBlogInput>