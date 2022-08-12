import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Form from '@/Components/Form'
import LinkButton from '@/Components/LinkButton'

export default function CreateSeat ({ auth, errors, halls }) {
  const inputs = [
    {
      name: 'hall',
      label: 'Hall',
      type: 'select',
      options: [...halls],
      defaultValue: ''
    },
    {
      name: 'row',
      label: 'Row',
      type: 'text',
      placeholder: 'Enter row of the seat (A-Z)',
      required: true
    },
    {
      name: 'column',
      label: 'Column',
      type: 'number',
      placeholder: 'Enter column of the seat (1-25)',
      required: true
    }
  ]
  const initialValues = {
    hall: '',
    row: '',
    column: ''
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className='font-semibold text-xl  leading-tight'>Manage Seats</h2>
      }
    >
      <Head title='Manage Seats' />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col flex-wrap gap-5 py-5'>
        <h4 className='dark:text-white'>Add Seat</h4>
        <Form
          routeName='seats.store'
          inputs={inputs}
          initialValues={initialValues}
          goBackRoute='/seats'
        />
      </div>
    </Authenticated>
  )
}
