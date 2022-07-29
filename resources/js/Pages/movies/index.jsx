import React, { useEffect, useState } from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Table from '@/Components/Table'
import LinkButton from '@/Components/LinkButton'
import { Pagination } from 'flowbite-react'

export default function Movies ({ auth, errors, movies: data }) {
  const [movies, setMovies] = useState(null)
  const [page, setPage] = useState(1)
  useEffect(() => {
    const size = 10
    const offset = size * (page - 1)
    data.slice(offset, offset + size).forEach(movie => {
      delete movie.description
      delete movie.poster_path
      delete movie.release_year
      if (!isNaN(movie.duration)) {
        movie.duration = movie.duration + ' min'
      }
    })
    setMovies(data.slice(offset, offset + size))
  }, [page])
  const onPageChange = (page) => {
    setPage(page)
    console.log(page)
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={<h2 className='font-semibold text-xl  leading-tight'>Manage Movies</h2>}
    >
      <Head title='Manage Movies' />

      <div className='py-12'>
        <div className='flex gap-5 flex-col mx-5 lg:w-[80%] lg:mx-auto'>
          <div className='flex justify-between'>
            <h3 className='dark:text-white text-lg'>List of Movies</h3>
            <LinkButton href='/movies/create'>add</LinkButton>
          </div>
          <Table headers={['#', 'title', 'duration', 'director']} data={movies} />
          {movies && (
            <div className='flex items-center justify-center text-center'>
              <Pagination
                currentPage={page}
                layout='table'
                onPageChange={onPageChange}
                showIcons
                totalPages={Math.ceil(data.length / 10)}
              />
            </div>
          )}
        </div>
      </div>
    </Authenticated>
  )
}
