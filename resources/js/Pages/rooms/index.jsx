import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Table from '@/Components/Table'
import LinkButton from '@/Components/LinkButton'

export default function Rooms ({ auth, errors, rooms }) {
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={<h2 className='font-semibold text-xl  leading-tight'>Manage Rooms</h2>}
    >
      <Head title='Manage Rooms' />

      <div className='py-12'>
        <div className='flex gap-5 flex-col mx-5 lg:w-[80%] lg:mx-auto'>
          <div className='flex justify-between'>
            <h3 className='dark:text-white text-lg'>List of Rooms</h3>
            <LinkButton href='/rooms/create'>add</LinkButton>
          </div>
          <Table headers={['#', 'number', 'type', 'status today']} data={rooms} />
        </div>
      </div>
    </Authenticated>
  )
}
