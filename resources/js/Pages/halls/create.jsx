import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Form from '@/Components/Form'
import LinkButton from '@/Components/LinkButton'

export default function CreateHall ({ auth, errors }) {
  const inputs = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter name of the hall',
      required: true
    },
    {
      name: 'capacity',
      label: 'Capacity',
      type: 'number',
      placeholder: 'Enter capacity of the hall',
      required: true
    }
  ]
  const initialValues = {
    name: '',
    capacity: ''
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className='font-semibold text-xl  leading-tight'>Manage Halls</h2>
      }
    >
      <Head title='Manage Halls' />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col flex-wrap gap-5 py-5'>
        <h4 className='dark:text-white'>Add Hall</h4>
        <Form
          routeName='halls.store'
          inputs={inputs}
          initialValues={initialValues}
          goBackRoute='/halls'
        />
      </div>
    </Authenticated>
  )
}
