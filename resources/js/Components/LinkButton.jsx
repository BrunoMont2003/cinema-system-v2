import { Link } from '@inertiajs/inertia-react'
import React from 'react'

const LinkButton = (props) => {
  return (
    <Link {...props} className={` text-white dark:text-black uppercase py-2 px-3 bg-slate-800 dark:bg-slate-300 text-sm rounded font-bold ${props.className} `} />
  )
}

export default LinkButton
