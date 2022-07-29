import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Form from '@/Components/Form'
import LinkButton from '@/Components/LinkButton'

export default function CreateClient ({ auth, errors }) {
  const inputs = [
    {
      label: 'dni',
      placeholder: 'Enter client dni',
      name: 'dni',
      type: 'text'
    },
    {
      label: 'First Name',
      placeholder: 'Enter client first name',
      name: 'first_name',
      type: 'text'
    },
    {
      label: 'Last Name',
      placeholder: 'Enter client last name',
      name: 'last_name',
      type: 'text'
    },
    {
      label: 'birth date',
      placeholder: 'Enter client birth date',
      name: 'birth_date',
      type: 'date'
    }
  ]
  const initialValues = {
    dni: '',
    first_name: '',
    last_name: '',
    birth_date: ''
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={<h2 className='font-semibold text-xl  leading-tight'>Manage Clients</h2>}
    >
      <Head label='Manage Clients' />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col flex-wrap gap-5 py-5'>
        <h4 className='dark:text-white'>Add Client</h4>
        <Form routeName='clients.store' inputs={inputs} initialValues={initialValues} />
        <LinkButton href='/clients' className='w-24 bg-blue-600 dark:bg-blue-300'>go back</LinkButton>

      </div>
    </Authenticated>
  )
}
