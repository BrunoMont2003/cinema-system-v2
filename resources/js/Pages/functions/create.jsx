import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Form from '@/Components/Form'
import LinkButton from '@/Components/LinkButton'

export default function CreateMovie ({ auth, errors, movies, halls }) {
  const inputs = [
    {
      name: 'movie',
      label: 'Movie',
      type: 'select',
      placeholder: 'Enter name of the movie',
      options: [
        ...movies
      ]
    },
    {
      name: 'hall',
      label: 'Hall',
      type: 'select',
      placeholder: 'Enter name of the hall',
      options: [
        ...halls
      ]
    },
    {
      name: 'showtime',
      label: 'Showtime',
      type: 'datetime-local',
      placeholder: 'Enter showtime of the movie',
      required: true
    }
  ]
  const initialValues = {
    movie: '',
    hall: '',
    showtime: ''
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={<h2 className='font-semibold text-xl  leading-tight'>Manage Functions</h2>}
    >
      <Head title='Manage Functions' />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col flex-wrap gap-5 py-5'>
        <h4 className='dark:text-white'>Add Function</h4>
        <Form routeName='functions.store' inputs={inputs} initialValues={initialValues} />
        <LinkButton href='/functions' className='w-24 bg-blue-600 dark:bg-blue-300'>go back</LinkButton>

      </div>
    </Authenticated>
  )
}
