"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import { CiBookmarkCheck } from 'react-icons/ci'

interface Props {
  path: string
  title: string
}

export const SidebarItem = ({ path, title }: Props) => {
  const currentPath = usePathname()

  return (
    <a
      href={path}
      className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group  ${
        currentPath === path ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : ''
      }`}
    >
      <CiBookmarkCheck size={30} />
      <span className='transition ease-linear duration-150 group-hover:text-gray-700'>{title}</span>
    </a>
  )
}
