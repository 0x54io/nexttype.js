import { PrismaClient } from '@prisma/client'

const singletonPrismaClient = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof singletonPrismaClient>
}

const prisma = globalThis.prisma ?? singletonPrismaClient()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma