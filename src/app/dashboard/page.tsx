import { WidgetItem } from '@/components'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Image from 'next/image'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('api/auth/signin')
  }
  return (
    <div>
      <div className='grid gap-6 grid-cols-1'>
        <WidgetItem title='Usuario conectado S-Side'>
          <div className='flex flex-col text-black w-full'>
            <Image src={session?.user?.image} width={100} height={100} alt={`image from ${session.user?.name}`} />
            <span>{session.user?.name}</span>
            <span>{session.user?.email}</span>
            <span>{session.user?.image}</span>
            <span>{JSON.stringify(session)}</span>
          </div>
        </WidgetItem>
      </div>
    </div>
  )
}
