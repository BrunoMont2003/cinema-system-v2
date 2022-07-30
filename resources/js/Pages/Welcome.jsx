import React from 'react'
import { Link, Head } from '@inertiajs/inertia-react'
import Guest from '@/Layouts/Guest'

export default function Welcome (props) {
  return (
    <Guest user={props.auth.user}>
      <Head title='Welcome' />
      <div className='w-full flex flex-col md:flex-row gap-16 justify-center md:items-center '>
        <div className='md:ml-[100px] max-w-[200px] md:max-w-[400px]'>
          <h1 className='mb-[50px] font-black text-5xl  '>Welcome to the Cinema Management</h1>
          <Link href={props.auth.user ? '/dashboard' : '/login'} className='bg-blue-600 font-bold px-5 py-3 rounded text-2xl text-slate-300 '>Get Started</Link>
        </div>
        <div>
          <figure className='p-[1px] dark:bg-white  rounded-lg'>
            <img src='https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' alt='' className='rounded-lg w-full' />
          </figure>
        </div>
      </div>
    </Guest>
  )
}
