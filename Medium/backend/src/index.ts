import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { decode , sign , verify } from 'hono/jwt'
// import { getPrisma } from '../lib/prisma'
// import { prisma_type } from '../lib/prisma'

const app = new Hono<{
  Bindings: {
    DATABASE_URL : string,
    JWT_SECRET : string
  }
  // Variables : {
  //   prisma : prisma_type
  // }
}>()

// app.use('*' , async(c,next) => {
//   const prisma = getPrisma(c.env.DATABASE_URL)
//   c.set('prisma' , prisma)
//   await next() 
// })

app.use('/api/v1/blog/*' , async(c,next) => {
  const header = c.req.header("authorization") || ""
  const token = header.split(" ")[1]

  const response = await verify(token , c.env.JWT_SECRET)
  if(response.id){
    await next()
  }else{
    c.status(403)
    return c.json({ error : "unauthorized" })
  }
})

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json()
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


app.post('/api/v1/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json()

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


app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})


app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})


app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

export default app
