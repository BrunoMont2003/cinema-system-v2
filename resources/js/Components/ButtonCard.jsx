import { Link } from '@inertiajs/inertia-react'
import React from 'react'

const ButtonCard = ({ className, route, children }) => {
  return (
    <Link className={'overflow-hidden cursor-pointer h-48 shadow-sm rounded-lg p-6 border-b border-gray-200 flex items-center justify-center font-black text-3xl max-w-[16rem] ' + className} href={route}>{children}</Link>
  )
}

export default ButtonCard
