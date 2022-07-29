import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Form from '@/Components/Form'
import LinkButton from '@/Components/LinkButton'

export default function CreateReservation ({ auth, errors, clients, rooms }) {
  const inputs = [
    {
      title: 'room',
      name: 'room_id',
      type: 'select',
      options: [...rooms]
    },
    {
      title: 'client',
      name: 'client_id',
      type: 'select',
      options: [...clients]
    },
    {
      title: 'begin',
      name: 'begin',
      type: 'date'
    },
    {
      title: 'end',
      name: 'end',
      type: 'date'
    }
  ]
  const initialValues = {
    room_id: '',
    client_id: '',
    begin: '',
    end: '',
    status: ''
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={<h2 className='font-semibold text-xl  leading-tight'>Manage Reservations</h2>}
    >
      <Head title='Manage Reservations' />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col flex-wrap gap-5 py-5'>
        <h4 className='dark:text-white'>Add Reservation</h4>
        <Form routeName='reservations.store' inputs={inputs} initialValues={initialValues} />
        <LinkButton href='/reservations' className='w-24 bg-blue-600 dark:bg-blue-300'>go back</LinkButton>

      </div>
    </Authenticated>
  )
}
