import React, { useEffect, useState } from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Table from '@/Components/Table'
import LinkButton from '@/Components/LinkButton'
import { Pagination } from 'flowbite-react'

export default function Halls ({ auth, errors, halls: data }) {
  const [halls, setHalls] = useState(null)
  const [page, setPage] = useState(1)
  useEffect(() => {
    const size = 10
    const offset = size * (page - 1)
    setHalls(data.slice(offset, offset + size))
  }, [page])
  const onPageChange = (page) => {
    setPage(page)
    console.log(page)
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={<h2 className='font-semibold text-xl  leading-tight'>Manage Halls</h2>}
    >
      <Head title='Manage Halls' />

      <div className='py-12'>
        <div className='flex gap-5 flex-col mx-5 lg:w-[80%] lg:mx-auto'>
          <div className='flex justify-between'>
            <h3 className='dark:text-white text-lg'>List of Halls</h3>
            <LinkButton href='/halls/create'>add</LinkButton>
          </div>
          <Table headers={['#', 'name', 'capacity']} data={halls} />
          {halls && (
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
