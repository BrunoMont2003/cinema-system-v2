import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Form from '@/Components/Form'
import LinkButton from '@/Components/LinkButton'

export default function CreateMovie ({ auth, errors }) {
  const inputs = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      placeholder: 'Title of the movie',
      required: true
    },
    {
      name: 'duration',
      label: 'Duration',
      type: 'number',
      placeholder: 'Duration of the movie (minutes)',
      required: true
    },
    {
      name: 'director',
      label: 'Director',
      type: 'text',
      placeholder: 'Director of the movie',
      required: true
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Description of the movie'
    },
    {
      name: 'poster_path',
      label: 'Poster',
      type: 'url',
      placeholder: 'Poster url of the movie'
    },
    {
      name: 'release_year',
      label: 'Release Year',
      type: 'number',
      placeholder: 'Release year of the movie'
    }
  ]
  const initialValues = {
    title: '',
    duration: '',
    director: '',
    description: '',
    poster_path: '',
    release_year: ''
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className='font-semibold text-xl  leading-tight'>Manage Movies</h2>
      }
    >
      <Head title='Manage Movies' />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col flex-wrap gap-5 py-5'>
        <h4 className='dark:text-white'>Add Movie</h4>
        <Form
          routeName='movies.store'
          inputs={inputs}
          initialValues={initialValues}
          goBackRoute='/movies'
        />
      </div>
    </Authenticated>
  )
}
