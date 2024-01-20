import { Todo } from '@prisma/client'

import styles from './TodoItem.module.css'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'

interface Props {
  todo: Todo
}
export const TodoItem = ({ todo }: Props) => {
  return (
    <div className={todo.completed ? styles.todoDone : styles.todoPending}>
      <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
        <div
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
            todo.completed ? 'bg-blue-100' : '? bg-red-100'
          }`}
        >
          {todo.completed ? <MdCheckBox size={30} /> : <MdCheckBoxOutlineBlank size={30} />}
        </div>
        <div className='text-center sm:text-leftÍ'></div>
      </div>
    </div>
  )
}
