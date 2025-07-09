import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@arka07/medium-project";

export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables : {
      userId : string
    }
}>()


blogRouter.use('/*' , async(c,next) => {
  try{
    const header = c.req.header("authorization") || ""
    const token = header.split(" ")[1]

    const response = await verify(token , c.env.JWT_SECRET)
    if(response){
      c.set('userId' , String(response.id))
      await next()
    }else{
      c.status(403)
      return c.json({ error : "unauthorized" })
    }
  }catch(err){
    return c.json({
      message : "Authentication Invalid"
    })
  }  
})

blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const {success} = createBlogInput.safeParse(body)
  
  if(!success){
    return c.json({
      message : "Wrong input format"
    })
  }

  const id = c.get('userId')

  try{
    const blog = await prisma.post.create({
      data : {
        title : body.title,
        content : body.content,
        authorId : id
      }
    })

    return c.json({
      id : blog.id
    })
  }catch(err){
    return c.json({
      message : "Some error occurred while uploading blog."
    })
  }
})


blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const {success} = updateBlogInput.safeParse(body)
  
  if(!success){
    return c.json({
      message : "Wrong input format"
    })
  }

  try{
    const blog = await prisma.post.update({
      where : {
        id : body.id
      },
      data : {
        title : body.title,
        content : body.content
      }
    })

    return c.json({
      id : blog.id
    })
  }catch(err){
    return c.json({
      message : "Some error occurred while uploading blog."
    })
  } 
})


// add pagination
blogRouter.get('/bulk' , async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const blogs = await prisma.post.findMany({
    select: {
      id : true,
      title : true,
      content : true
    }
  })

  return c.json({
    blogs
  })
})

blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const id = c.req.param('id')

  try{
    const blog = await prisma.post.findFirst({
      where : {
        id : id
      }
    })

    if(blog){
      return c.json({
        blog
      })
    }
    
    return c.json({
      message : "No blog with this id found"
    })
  }catch(err){
    return c.json({
      message : "Some error occurred while uploading blog."
    })
  }
})

export default blogRouter