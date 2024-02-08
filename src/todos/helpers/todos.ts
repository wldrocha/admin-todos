import { Todo } from '@prisma/client'


//delay function
// const sleep = (seconds: number = 0): Promise<boolean> => {
//   return new Promise((resolve) =>
//     setTimeout(() => {
//       resolve(true)
//     }, seconds * 1000)
//   )
// }

export const updateTodo = async (id: string, completed: boolean): Promise<Todo> => {
  const body = { completed }
  const todo = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then((res) => res.json())
  return todo
}

export const createTodo = async (description: string): Promise<Todo> => {
  const body = { description }
  const todo = await fetch(`/api/todos/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then((res) => res.json())
  return todo
}

export const deleteAllTodos = async (): Promise<Todo[]> => {
  const todos = await fetch(`/api/todos/`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => res.json())
  console.log('🚀 ~ deleteAllTodos ~ todos:', todos)
  return todos
}
