import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Form from '@/Components/Form'

export default function EditSeat ({ auth, errors, seat, halls }) {
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
    id: seat.id,
    hall: seat.hall_id,
    row: seat.row,
    column: seat.column
  }

  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className='font-semibold text-xl  leading-tight'>Manage Seats</h2>
      }
    >
      <Head label='Manage Seats' />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col flex-wrap gap-5 py-5'>
        <h4 className='dark:text-white'>Edit Seat</h4>
        <Form
          routeName='seats.update'
          inputs={inputs}
          initialValues={initialValues}
          method='put'
          goBackRoute='/seats'
        />
      </div>
    </Authenticated>
  )
}
