'use server'

import prisma from '@/app/lib/prisma'
import { Todo } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const toggleTodo = async (id: string, completed: boolean): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } })
  if (!todo) {
    throw new Error(`Todo with id ${id} not found`)
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed }
  })
  revalidatePath('/dashboard/server-todos')
  return updatedTodo
}

export const addTodo = async (description: string) => {
  try {
    // const { completed, description } = await postSchema.validate(await request.json())
    const todo = await prisma.todo.create({ data: { description } })
    revalidatePath('/dashboard/server-todos')
    return todo
  } catch (error) {
    return {
      message: 'Error on create todo'
    }
  }
}

export const deleteCompletedTodos = async () => {
  try {
    const deleteAllTodos = await prisma.todo.deleteMany({
      where: { completed: true }
    })
    revalidatePath('/dashboard/server-todos')
    return deleteAllTodos
  } catch (error) {
    return {
      message: 'Error on delete completed todos'
    }
  }
}
