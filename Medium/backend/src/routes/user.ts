import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode , sign , verify } from 'hono/jwt'
import { signinInput, signupInput } from "@arka07/medium-project";

export const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    }
}>()

userRouter.post('/signup', async (c) => {
  // const prisma = new PrismaClient({
  //   datasourceUrl : c.env.DATABASE_URL
  // }).$extends(withAccelerate())

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const {success} = signupInput.safeParse(body);
  if(!success){
    c.status(411)
    return c.json({
      message : "Wrong input format"
    })
  }
  const email = body.email
  try{
    const already_exist = await prisma.user.findUnique({
      where:{
        email : email
      }
    })

    if(already_exist){
      return c.json({
        message : "Email already exists.Please try another email."
      })
    }

    const user = await prisma.user.create({
      data: {
        email : email,
        password : body.password
      }
    })

    const secret = c.env.JWT_SECRET
    const token = await sign({id : user.id}, secret)

    return c.json({
      jwt : token
    })

  }catch(err){
    return c.json({
      message : "Some error occurred. Please try some times later."
    })
  }
})


userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const {success} = signinInput.safeParse(body)

  if(!success){
    return c.json({
      message : "Wrong input format"
    })
  }
  try{
    const user_exists = await prisma.user.findUnique({
      where: {
        email : body.email,
        password : body.password
      }
    })

    if(user_exists){
      const secret = c.env.JWT_SECRET
      const token = await sign({id : user_exists.id}, secret)
      return c.json({
        jwt : token
      })
    }

    return c.json({
      message : "Email doesn't exists. SignUp first."
    })
  }catch(err){
    return c.json({
      message : "Some error occurred. Please try some times later."
    })
  }
})

export default userRouter