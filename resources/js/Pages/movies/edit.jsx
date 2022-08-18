import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Form from '@/Components/Form'

export default function EditMovie ({ auth, errors, movie }) {
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
      name: 'release_date',
      label: 'Release Date',
      type: 'date',
      placeholder: 'Release date of the movie'
    }
  ]
  const initialValues = {
    id: movie.id,
    title: movie.title,
    duration: movie.duration,
    director: movie.director,
    description: movie.description,
    poster_path: movie.poster_path,
    release_date: movie.release_date
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className='font-semibold text-xl  leading-tight'>Manage Movies</h2>
      }
    >
      <Head label='Manage Movies' />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col flex-wrap gap-5 py-5'>
        <h4 className='dark:text-white'>Edit Movie</h4>
        <Form
          routeName='movies.update'
          inputs={inputs}
          initialValues={initialValues}
          method='put'
          goBackRoute='/movies'
        />
      </div>
    </Authenticated>
  )
}
