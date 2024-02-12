'server-only'

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (request: NextRequest) => {
  const count = await prisma.site.count({
  })

  if (0 < count) {
    return NextResponse.json({}, { status: 400 })
  }
  
  const {domain, name, description, email, password} = await request.json()

  if (!domain || !name || !description || !email || !password) {
    return NextResponse.json({}, { status: 400 })
  }

  const [site, author] = await prisma.$transaction([
    prisma.site.create({
      data: {
        domain, name, description
      }
    }),
    prisma.author.create({
      data: {
        email, password
      }
    })
  ])

  return NextResponse.json({site, author}, { status: 200 })
}