// https://tailwindcomponents.com/component/radio-buttons-1
'use client'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Pros {
  currentTab?: number
  tabOptions?: number[]
}
export const TabBar = ({ currentTab = 1, tabOptions = [1, 2, 3, 4] }: Pros) => {
  const [selected, setSelected] = useState(currentTab)
  const router = useRouter()

  const onTabSelected = (tab: number) => {
    setSelected(tab)
    setCookie('currentTab', tab.toString())
    router.refresh()
  }
  return (
    <div className={`grid w-full ${'grid-cols-' + tabOptions.length} space-x-2 rounded-xl bg-gray-200 p-2`}>
      {tabOptions.map((tabOption: number) => (
        <div key={tabOption}>
          <input
            type='radio'
            checked={selected === tabOption}
            onChange={() => {}}
            id={`${tabOption}`}
            className='peer hidden'
          />
          <label
            onClick={() => onTabSelected(tabOption)}
            className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'
          >
            {tabOption}
          </label>
        </div>
      ))}
    </div>
  )
}
