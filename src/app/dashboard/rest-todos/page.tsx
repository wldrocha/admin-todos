export const dynamic = 'force-dynamic'
export const revalidate = 0

//Lineas para revalidar la nformacion simepre, no funciona en fuera de page, layoute o route handler

import prisma from '@/app/lib/prisma'
import { getUserServerSession } from '@/auth'
import { NewTodo, TodosGrid } from '@/todos'
import { redirect } from 'next/navigation'

export default async function RestTodoPage() {
  const user = await getUserServerSession()
  console.log('🚀 ~ RestTodoPage ~ user:', user)
  if (!user) redirect('/api/auth/signin')
  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: 'asc' }
  })

  return (
    <div>
      <div className='w-full px-3 mx-5 mb-5'>
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  )
}
