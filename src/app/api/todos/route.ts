import prisma from '@/app/lib/prisma'
import { getUserServerSession } from '@/auth'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'
Í
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const take = Number(searchParams.get('take') ?? '10')
  const skip = Number(searchParams.get('skip') ?? '0')

  if (isNaN(take)) {
    return NextResponse.json({ message: 'take must be a number' }, { status: 400 })
  }
  if (isNaN(skip)) {
    return NextResponse.json({ message: 'skip must be a number' }, { status: 400 })
  }
  const todos = await prisma.todo.findMany({ take, skip })
  return NextResponse.json(todos)
}

const postSchema = yup.object({
  description: yup.string().required(),
  completed: yup.boolean().optional().default(false) //Todo: mostrar algo interesante
})

export async function POST(request: Request) {
  const user = await getUserServerSession()
  if (!user) {
    return NextResponse.json('unauthorized', { status: 401 })
  }
  try {
    const { completed, description } = await postSchema.validate(await request.json())
    const todo = await prisma.todo.create({ data: { completed, description, userId: user.id } })
    return NextResponse.json(todo)
  } catch (error) {
    return NextResponse.json(error.errors, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  const user = await getUserServerSession()
  if (!user) {
    return NextResponse.json('unauthorized', { status: 401 })
  }
  try {
    const deleteAllTodos = await prisma.todo.deleteMany({
      where: { completed: true, userId: user.id }
    })
    console.log('🚀 ~ DELETE ~ deleteAllTodos:', deleteAllTodos)
    return NextResponse.json(deleteAllTodos)
  } catch (error) {
    return NextResponse.json(error.errors, { status: 400 })
  }
}
