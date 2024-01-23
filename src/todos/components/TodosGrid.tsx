'use client'

import { Todo } from '@prisma/client'
import { TodoItem } from '.'

interface Props {
  todos?: Todo[]
}

import * as todosApi from '@/todos/helpers'
import { useRouter } from 'next/navigation'

export const TodosGrid = ({ todos = [] }: Props) => {

  const router = useRouter()

  const toggleTodo = async (id: string, completed: boolean) => {
     await todosApi.updateTodo(id, completed)
    router.refresh()
  }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  )
}
