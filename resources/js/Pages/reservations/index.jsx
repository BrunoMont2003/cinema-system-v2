import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Table from '@/Components/Table'
import LinkButton from '@/Components/LinkButton'

export default function Reservations ({ auth, errors, reservations }) {
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={<h2 className='font-semibold text-xl  leading-tight'>Manage Reservations</h2>}
    >
      <Head title='Manage Reservations' />

      <div className='py-12'>
        <div className='flex gap-5 flex-col mx-5 lg:w-[80%] lg:mx-auto'>
          <div className='flex justify-between'>
            <h3 className='dark:text-white text-lg'>List of Reservations</h3>
            <LinkButton href='/reservations/create'>add</LinkButton>
          </div>
          <Table headers={['#', 'room', 'client', 'begin', 'end', 'status', '']} data={reservations} buttons={[{ name: 'Conclude', baseLink: '/reservations/conclude/' }]} />
        </div>
      </div>
    </Authenticated>
  )
}
