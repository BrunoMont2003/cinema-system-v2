import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head, Link } from '@inertiajs/inertia-react'
import Form from '@/Components/Form'
import LinkButton from '@/Components/LinkButton'

export default function CreateRoom ({ auth, errors }) {
  const inputs = [
    {
      title: 'number',
      name: 'number',
      type: 'text'
    },
    {
      title: 'type',
      name: 'type',
      type: 'select',
      options: [{ id: 'simple', name: 'simple' }, { id: 'double', name: 'double' }]
    }
  ]
  const initialValues = {
    number: '',
    type: ''
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={<h2 className='font-semibold text-xl  leading-tight'>Manage Rooms</h2>}
    >
      <Head title='Manage Rooms' />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col flex-wrap gap-5 py-5'>
        <h4 className='dark:text-white'>Add Room</h4>
        <Form routeName='rooms.store' inputs={inputs} initialValues={initialValues} />
        <LinkButton href='/rooms' className='w-24 bg-blue-600 dark:bg-blue-300'>go back</LinkButton>

      </div>
    </Authenticated>
  )
}
