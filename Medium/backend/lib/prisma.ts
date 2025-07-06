// error while caching prismaClient , so it gets initiated only once and can be used in all routes rather than
// making new instance of prismaClient every time we move from one route to another. 


// solved , just have your all codes in one file , in this case , all code in src/index.ts

// In Cloudflare Workers, each request runs inside a separate V8 isolate, which means there is
// no shared global memory between requests. If PrismaClient is instantiated at the top level 
// of a file (especially a shared module), it executes during the bundle/load phase — outside 
// the request context — which violates the edge runtime model and causes Prisma to throw an error.
// However, when everything is kept in a single file, top-level code is still executed per isolate,
// so Prisma appears to work. The correct and edge-safe approach is to instantiate PrismaClient 
// inside the request scope (e.g., within a route or middleware) to ensure it runs only inside the 
// isolate and complies with Cloudflare's runtime restrictions.

// "Top-level code" just means:
//     Code that runs immediately when a file is loaded — not inside a function.

// not the exact solution , search for it

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