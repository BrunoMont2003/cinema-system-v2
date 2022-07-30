import { useState } from 'react'

import { Link } from '@inertiajs/inertia-react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import ResponsiveNavLink from './ResponsiveNavLink'
import ApplicationLogo from './ApplicationLogo'

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
  {
    name: 'tickets',
    routeName: '/tickets',
    icon: 'fa-solid fa-ticket'
  }
]

export default function Sidebar ({ auth }) {
  const [collapseShow, setCollapseShow] = useState('hidden')
  const title = 'Cinema'
  return (
    <>

      <nav className='dark:bg-gray-800 dark:text-white md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 '>
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
          <Link
            className='md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap uppercase font-bold p-4 px-0  text-xl ml-6'
            href='/'
          >

            <ApplicationLogo />
            <span className='ml-5'>
              {title}
            </span>
          </Link>
          {/* User */}
          <ul className='md:hidden items-center flex flex-wrap list-none ml-6'>
            <li className='inline-block relative'>
              {/* <NotificationDropdown /> */}
            </li>
            <li className='inline-block relative'>
              {/* <UserDropdown /> */}
            </li>
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

            <ul className='md:flex-col md:min-w-full flex flex-col list-none ml-6'>
              {
                    navitems.map(({ icon, name, routeName }, index) => (
                      <li key={index} className='items-center'>
                        <Link
                          className={
                            'text-xs uppercase py-3 font-bold block ' +
                            (window.location.href.indexOf('/admin/dashboard') !== -1
                              ? 'text-lightBlue-500 hover:text-lightBlue-600'
                              : 'text-blueGray-700 hover:text-blueGray-500')
                          }
                          href={routeName}
                        >
                          <i
                            className={icon +
                              ' mr-2 text-sm ' +
                              (window.location.href.indexOf('/admin/dashboard') !== -1
                                ? 'opacity-75'
                                : 'text-blueGray-300')}
                          />{' '}
                          {name}
                        </Link>
                      </li>

                    ))
                }

            </ul>

            {/* Divider */}
            <hr className='my-4 md:min-w-full' />

            <div className='pt-4 pb-1 border-gray-200 dark:text-white text-gray-500'>
              <div className='px-4'>
                <div className='font-medium text-base'>{auth.user.name}</div>
                <div className='font-medium text-sm'>{auth.user.email}</div>
              </div>
            </div>

            <div className='mt-3 space-y-1'>
              <ResponsiveNavLink method='post' href={route('logout')} as='button'>
                Log Out
              </ResponsiveNavLink>
            </div>

          </div>
        </div>
      </nav>
    </>
  )
}
