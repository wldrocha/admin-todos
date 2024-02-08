import prisma from '@/app/lib/prisma'
import { getUserServerSession } from '@/auth'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'

interface Arguments {
  params: {
    id: string
  }
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const user = await getUserServerSession()

  const todo = await prisma.todo.findFirst({ where: { id } })
  if (!user || todo?.userId !== user.id) {
    return null
  }
  return todo
}

export async function GET(request: Request, { params }: Arguments) {
  const { id } = params
  const todo = getTodo(id)
  if (!todo) {
    return NextResponse.json({ message: `Todo with id ${id} not found` }, { status: 404 })
  }
  return NextResponse.json({ todo })
}

const putSchema = yup.object({
  description: yup.string().optional(),
  completed: yup.boolean().optional()
})

export async function PUT(request: Request, { params }: Arguments) {
  const { id } = params
  const todo = getTodo(id)
  if (!todo) {
    return NextResponse.json({ message: `Todo with id ${id} not found` }, { status: 404 })
  }

  try {
    const { description, completed } = await putSchema.validate(await request.json())

    const uppdatedTodo = await prisma.todo.update({
      where: { id },
      data: { description, completed }
    })
    return NextResponse.json(uppdatedTodo)
  } catch (error) {
    return NextResponse.json(error.errors, { status: 400 })
  }
}
