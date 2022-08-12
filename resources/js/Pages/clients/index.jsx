import React, { useEffect, useState } from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Table from '@/Components/Table'
import LinkButton from '@/Components/LinkButton'
import moment from 'moment'
import { Pagination } from 'flowbite-react'
import { Inertia } from '@inertiajs/inertia'

export default function Clients ({ auth, errors, clients: data }) {
  const [clients, setClients] = useState(null)
  const [page, setPage] = useState(1)
  useEffect(() => {
    const size = 10
    const offset = size * (page - 1)
    data.slice(offset, offset + size).forEach((client) => {
      if (client.first_name && client.last_name) {
        client.name = client.first_name + ' ' + client.last_name
        delete client.first_name
        delete client.last_name
        const date = moment(client.birth_date).format('LL')
        delete client.birth_date
        client.birth_date = date
      }
    })
    setClients(data.slice(offset, offset + size))
  }, [page])
  const onPageChange = (page) => {
    console.log(page)
    setPage(page)
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className='font-semibold text-xl  leading-tight'>Manage Clients</h2>
      }
    >
      <Head title='Manage Clients' />

      <div className='py-12'>
        <div className='flex gap-5 flex-col mx-5 lg:w-[80%] lg:mx-auto'>
          <div className='flex justify-between'>
            <h3 className='dark:text-white text-lg'>List of Clients</h3>
            <LinkButton href='/clients/create'>add</LinkButton>
          </div>
          <Table
            headers={['#', 'dni', 'name', 'birthdate', '']}
            data={clients}
            buttons={[
              {
                name: 'edit',
                className: 'dark:bg-blue-600 bg-blue-400',
                icon: 'fa-solid fa-edit',
                onClick: (e) => {
                  Inertia.visit(`/clients/${e.target.dataset.row}/edit`)
                }
              },
              {
                name: 'delete',
                className: 'dark:bg-red-600 bg-red-400',
                icon: 'fa-solid fa-trash'
              }
            ]}
          />

          {clients && (
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
