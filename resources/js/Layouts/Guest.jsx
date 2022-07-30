import React from 'react'
import ApplicationLogo from '@/Components/ApplicationLogo'
import LinkButton from '@/Components/LinkButton'
import DarkModeToggle from '@/Components/DarkModeToggle'
import { Link } from '@inertiajs/inertia-react'
const NavbarGuest = ({user}) => {
  return (
  // create a responsive navbar with 2 buttons login and register but if the user is logged add button logout and dashboard
    <nav>
      <div className='flex items-center justify-between flex-wrap bg-neutral-300 dark:bg-black p-6'>
        <div className='flex items-center text-white mr-6'>
          <Link href='/'>
            <ApplicationLogo className='text-4xl text-gray-800 dark:text-white' />
          </Link>
        </div>
        <div className='flex items-center w-auto gap-5'>
          {
            !user
              ? (
                <>
                  <LinkButton href='/login'>Login</LinkButton>
                  <LinkButton href='/register'>Register</LinkButton>
                </>
                )
              : (
                <>
                  <LinkButton href='/dashboard'>Dashboard</LinkButton>
                </>
                )
          }
          <DarkModeToggle />
        </div>
      </div>

    </nav>
  )
}

export default function Guest ({children, user}) {
  return (
    <div className='w-screen'>
      <NavbarGuest user = {user} />
      <div className='px-6 py-4 bg-slate-200 min-h-[calc(100vh-90.5px)] dark:bg-gray-900 dark:text-slate-100 shadow-md overflow-hidden w-full flex items-center justify-center'>
        {children}
      </div>
    </div>
  )
}
