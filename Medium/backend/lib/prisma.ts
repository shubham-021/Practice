// error while caching prismaClient , so it gets initiated only once and can be used in all routes rather than
// making new instance of prismaClient every time we move from one route to another. 

import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

function createPrisma(databaseUrl: string) {
  return new PrismaClient({
    datasourceUrl: databaseUrl,
  }).$extends(withAccelerate())
}

export type prisma_type = ReturnType<typeof createPrisma>

let globalPrisma: prisma_type | null = null

export function getPrisma(databaseUrl: string) {
  if (!globalPrisma) {
    globalPrisma = new PrismaClient({
      datasourceUrl: databaseUrl,
    }).$extends(withAccelerate())
  }
  return globalPrisma
}