import prisma from '@/app/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {
  await prisma.todo.deleteMany()
  await prisma.user.deleteMany()

  const user = await prisma.user.create({
    data: {
      email: 'test@email.com',
      password: bcrypt.hashSync('123456'),
      roles: ['admin', 'client', 'super-user'],
      todos: {
        create: [
          {
            description: 'save glases',
            completed: true
          },
          { description: 'buy milk' },
          { description: 'buy bread' }
        ]
      }
    }
  })
  return NextResponse.json({ message: 'Seed executed' })
}
