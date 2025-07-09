// should read lib/prisma for better understanding of prisma singleton setup
import { Hono } from 'hono'
import blogRouter from './routes/blog'
import userRouter from './routes/user'
import { cors } from 'hono/cors'
// import { getPrisma } from '../lib/prisma'
// import { prisma_type } from '../lib/prisma'

// function createClient(database_url : string){
//   const prisma = new PrismaClient({
//     datasourceUrl : database_url
//   }).$extends(withAccelerate())

//   return prisma
// }

// type prisma_type = ReturnType<typeof createClient>

// let globalPrisma: prisma_type | null = null

// function getPrisma(databaseUrl: string) {
//   if (!globalPrisma) {
//     globalPrisma = new PrismaClient({
//       datasourceUrl: databaseUrl,
//     }).$extends(withAccelerate())
//   }
//   return globalPrisma
// }

const app = new Hono<{
  Bindings: {
    DATABASE_URL : string,
    JWT_SECRET : string
  }
  // Variables : {
  //   prisma : prisma_type
  // }
}>()

app.use('*', cors())
// app.use('*' , async(c,next)=>{
//   const prisma = getPrisma(c.env.DATABASE_URL)
//   c.set('prisma' , prisma)
//   await next()
// })

// app.use('*' , async(c,next) => {
//   const prisma = getPrisma(c.env.DATABASE_URL)
//   c.set('prisma' , prisma)
//   await next() 
// })

// app.use('*' , async(c , next)=>{
//   const prisma = new PrismaClient({
//     datasourceUrl : c.env.DATABASE_URL
//   }).$extends(withAccelerate())
  
//   c.set('prisma' , prisma)
//   await next()
// })

app.route('/api/v1/user' , userRouter)
app.route('/api/v1/blog' , blogRouter)


export default app
