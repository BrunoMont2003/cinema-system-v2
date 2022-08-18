import { useState } from 'react'

import { Link, usePage } from '@inertiajs/inertia-react'
import ResponsiveNavLink from './ResponsiveNavLink'
import ApplicationLogo from './ApplicationLogo'
import { useSidebarContext } from '@/Context/SidebarContext'
export const navitems = [
  {
    name: 'dashboard',
    routeName: '/dashboard',
    icon: 'fas fa-tv'
  },
  {
    name: 'clients',
    routeName: '/clients',
    icon: 'fa-solid fa-user'
  },
  {
    name: 'movies',
    routeName: '/movies',
    icon: 'fa-solid fa-film'
  },
  {
    name: 'halls',
    routeName: '/halls',
    icon: 'fa-solid fa-photo-video'
  },
  {
    name: 'functions',
    routeName: '/functions',
    icon: 'fa-solid fa-play'
  },
  // {
  //   name: 'seats',
  //   routeName: '/seats',
  //   icon: 'fa-solid fa-glasses'
  // },
  {
    name: 'tickets',
    routeName: '/tickets',
    icon: 'fa-solid fa-ticket'
  }
]

export default function Sidebar ({ auth }) {
  const [collapseShow, setCollapseShow] = useState('hidden')
  const { sidebarShow, setSidebarShow } = useSidebarContext()
  const title = 'Cinema'
  const { url } = usePage()
  return (
    <>
      <nav
        className={`dark:bg-gray-800 dark:text-white md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 duration-600 ease-in-out ${
          !sidebarShow ? 'md:top-0 md:-left-[210px]' : ''
        }`}
      >
        <div className='md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full'>
          {/* Toggler */}
          <button
            className='dark:text-slate-50 cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent'
            type='button'
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <i className='fas fa-bars' />
          </button>
          {/* Brand */}
          <div className='flex gap-5 items-center justify-between'>
            <Link
              className='md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap uppercase font-bold p-4 px-0  text-xl ml-6 '
              href='/'
            >
              <ApplicationLogo />
              <span className='ml-5'>{title}</span>
            </Link>
            <button
              className='dark:text-slate-50 cursor-pointer text-black opacity-50 hidden md:block px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent'
              type='button'
              onClick={() => {
                setSidebarShow(!sidebarShow)
              }}
            >
              <i className='fas fa-bars' />
            </button>
          </div>
          {/* User */}
          <ul className='md:hidden items-center flex flex-wrap list-none ml-6'>
            <li className='inline-block relative'>
              {/* <NotificationDropdown /> */}
            </li>
            <li className='inline-block relative'>{/* <UserDropdown /> */}</li>
          </ul>
          {/* Collapse */}
          <div
            className={
              'dark:bg-slate-800 md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className='md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200 '>
              <div className='flex flex-wrap'>
                <div className='w-6/12'>
                  <Link
                    className='md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0'
                    href='/'
                  >
                    {title}
                  </Link>
                </div>
                <div className='w-6/12 flex justify-end'>
                  <button
                    type='button'
                    className='dark:text-slate-50 cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent'
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <i className='fas fa-times' />
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className='mt-6 mb-4 md:hidden'>
              <div className='mb-3 pt-0'>
                <input
                  type='text'
                  placeholder='Search'
                  className='px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-transparent rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal'
                />
              </div>
            </form>

            {/* Divider */}
            <hr className='my-4 md:min-w-full' />
            {/* Heading */}
            <h6 className='md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline ml-6'>
              Management
            </h6>
            {/* Navigation */}

            <ul className='md:flex-col md:min-w-full flex flex-col list-none'>
              {navitems.map(({ icon, name, routeName }, index) => (
                <li key={index} className='items-center'>
                  <Link
                    className={`flex gap-2 items-center ${
                      !sidebarShow
                        ? 'flex-row-reverse justify-between pr-2'
                        : ''
                    } text-xs uppercase py-3 font-bold block pl-6 ${
                      url.startsWith(routeName)
                        ? 'bg-slate-800 dark:bg-slate-200 dark:text-black text-white rounded-md md:rounded-none'
                        : ''
                    }`}
                    href={routeName}
                  >
                    <i className={icon + ' mr-2 text-sm '} />
                    <span>{name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <hr className='my-4 md:min-w-full' />

            <div className='pt-4 pb-1 border-gray-200 dark:text-white text-gray-500'>
              <div className='px-4'>
                <div className='font-medium text-base'>{auth.user.name}</div>
                <div className='font-medium text-sm'>{auth.user.email}</div>
              </div>
            </div>

            <div
              className={`mt-3 space-y-1 flex ${
                !sidebarShow ? 'flex-row-reverse' : ''
              }`}
            >
              <Link
                className={`dark:text-white text-gray-500 hover:bg-slate-100 dark:hover:bg-gray-700 duration-500 rounded w-full flex items-center font-light px-4 py-4 text-sm gap-5 ${
                  !sidebarShow ? 'flex-row-reverse' : ''
                }`}
                method='post'
                href={route('logout')}
                as='button'
              >
                <i className='fa-solid fa-arrow-right-from-bracket hidden' />
                <span className={`${!sidebarShow ? 'block' : ''}`}>
                  Log Out
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
