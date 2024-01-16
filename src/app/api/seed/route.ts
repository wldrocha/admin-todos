import prisma from '@/app/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {
  await prisma.todo.deleteMany()

  const todo = await prisma.todo.createMany({
    data: [
      {
        description: 'save glases',
        completed: true
      },
      { description: 'buy milk' },
      { description: 'buy bread' }
    ]
  })
  console.log('🚀 ~ GET ~ todo:', todo)
  return NextResponse.json({ message: 'Seed executed' })
}
