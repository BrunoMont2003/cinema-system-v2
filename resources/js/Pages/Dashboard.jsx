import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import ButtonCard from '@/Components/ButtonCard'
import { navitems } from '@/Components/Sidebar'

export default function Dashboard (props) {
  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className='font-semibold text-xl  leading-tight'>Dashboard</h2>}
    >
      <Head title='Dashboard' />

      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-wrap gap-5'>
          {
            navitems.map(({ name, routeName }, index) => (
              name !== 'dashboard' &&
                <ButtonCard key={index} className='bg-slate-400 dark:bg-slate-500 text-slate-100' route={routeName}>
                  <span className='text-center'>Manage {name}</span>
                </ButtonCard>
            ))
          }

        </div>
      </div>
    </Authenticated>
  )
}
