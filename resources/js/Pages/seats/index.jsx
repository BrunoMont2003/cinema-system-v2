import React, { useEffect, useState } from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Table from '@/Components/Table'
import LinkButton from '@/Components/LinkButton'
import { Pagination } from 'flowbite-react'
import { isObject } from 'lodash'

export default function Seats ({ auth, errors, seats: data }) {
  const [seats, setSeats] = useState(null)
  const [page, setPage] = useState(1)
  useEffect(() => {
    console.log(seats)
    const size = 10
    const offset = size * (page - 1)
    data.slice(offset, offset + size).forEach(seat => {
      if (isObject(seat.hall)) {
        seat.hall = seat.hall.name
        delete seat.hall_id
      }
    })
    setSeats(data.slice(offset, offset + size))
  }, [page])
  const onPageChange = (page) => {
    setPage(page)
    console.log(page)
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={<h2 className='font-semibold text-xl  leading-tight'>Manage Seats</h2>}
    >
      <Head title='Manage Seats' />

      <div className='py-12'>
        <div className='flex gap-5 flex-col mx-5 lg:w-[80%] lg:mx-auto'>
          <div className='flex justify-between'>
            <h3 className='dark:text-white text-lg'>List of Seats</h3>
            <LinkButton href='/seats/create'>add</LinkButton>
          </div>
          <Table headers={['#', 'row', 'column', 'hall']} data={seats} />
          {seats && (
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
