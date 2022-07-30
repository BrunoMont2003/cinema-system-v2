import React, { useEffect, useState } from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Table from '@/Components/Table'
import LinkButton from '@/Components/LinkButton'
import { Pagination } from 'flowbite-react'
import { isObject } from 'lodash'
import moment from 'moment'

export default function Functions ({ auth, errors, functions: data }) {
  const [functions, setFunctions] = useState(null)
  const [page, setPage] = useState(1)
  useEffect(() => {
    const size = 10
    const offset = size * (page - 1)
    data.slice(offset, offset + size).forEach(fun => {
      if (isObject(fun.movie) && isObject(fun.hall)) {
        fun.movie = fun.movie.title
        delete fun.movie_id
        fun.hall = fun.hall.name
        delete fun.hall_id
        const date = moment(new Date(fun.showtime)).format('LLL')
        delete fun.showtime
        fun.showtime = date
      }
    })
    setFunctions(data.slice(offset, offset + size))
  }, [page])
  const onPageChange = (page) => {
    setPage(page)
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={<h2 className='font-semibold text-xl  leading-tight'>Manage Functions</h2>}
    >
      <Head title='Manage Functions' />

      <div className='py-12'>
        <div className='flex gap-5 flex-col mx-5 lg:w-[80%] lg:mx-auto'>
          <div className='flex justify-between'>
            <h3 className='dark:text-white text-lg'>List of Functions</h3>
            <LinkButton href='/functions/create'>add</LinkButton>
          </div>
          <Table headers={['#', 'movie', 'hall', 'showtime']} data={functions} />
          {functions && (
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
