import { Todo } from '@prisma/client'

import styles from './TodoItem.module.css'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { useOptimistic } from 'react'

interface Props {
  todo: Todo
  toggleTodo: (id: string, completed: boolean) => Promise<Todo | void>
}
export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(todo, (state, newCompleteValue: boolean) => ({
    ...state,
    completed: newCompleteValue
  }))

  const onToggleTodo = async () => {
    try {
        toggleTodoOptimistic(!todoOptimistic.completed)
        await toggleTodo(todoOptimistic.id, !todoOptimistic.completed)
    } catch (error) {
      toggleTodoOptimistic(!todoOptimistic.completed)
    }
  }
  return (
    <div className={todoOptimistic.completed ? styles.todoDone : styles.todoPending}>
      <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
        <div
          onClick={() => onToggleTodo()}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
            todoOptimistic.completed ? 'bg-blue-100' : '? bg-red-100'
          }`}
        >
          {todoOptimistic.completed ? <MdCheckBox size={30} /> : <MdCheckBoxOutlineBlank size={30} />}
        </div>
        <div className='text-center sm:text-leftÍ'>{todoOptimistic.description}</div>
      </div>
    </div>
  )
}
