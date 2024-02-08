import { TabBar } from '@/components'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Cookies page',
  description: 'Seo for Cookis page'
}
export default function CookisPage() {
  const cookieStore = cookies()
  const cookieTab = Number(cookieStore.get('currentTab')?.value ?? '1')

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
      <div className='flex flex-col'>
        <span className='text-3xl'>Tabs</span>
        <TabBar currentTab={cookieTab} />
      </div>
    </div>
  )
}
