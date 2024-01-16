import prisma from '@/app/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

interface Arguments {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: Arguments) {
  const { id } = params
  const todo = await prisma.todo.findFirst({ where: { id } })
  if (!todo) {
    return NextResponse.json({ message: `Todo with id ${id} not found` }, { status: 404 })
  }
  return NextResponse.json({ todo })
}
