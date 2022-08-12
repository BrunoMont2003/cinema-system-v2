import { useEffect, useState } from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Table from '@/Components/Table'
import LinkButton from '@/Components/LinkButton'
import moment from 'moment'
import { Pagination } from 'flowbite-react'

export default function Clients ({ auth, errors, clients: data }) {
  const [clients, setClients] = useState(null)
  const [page, setPage] = useState(1)
  useEffect(() => {
    let currentPage = getCurrentPage()
    currentPage = depureData(currentPage)
    setClients(currentPage)
  }, [page])
  const getCurrentPage = () => {
    const size = 10
    const offset = size * (page - 1)
    return data.slice(offset, offset + size)
  }

  const onPageChange = (page) => {
    console.log(page)
    setPage(page)
  }
  const depureData = (data) => {
    const newData = []
    data.forEach((client) => {
      const newClient = { ...client }
      newClient.name = newClient.first_name + ' ' + newClient.last_name
      delete newClient.first_name
      delete newClient.last_name
      const date = moment(newClient.birth_date).format('LL')
      delete newClient.birth_date
      newClient.birth_date = date

      newData.push(newClient)
    })
    return newData
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
                name: '',
                icon: 'fa-solid fa-eye',
                className: 'dark:bg-green-700 bg-green-500'
              },
              {
                name: 'edit',
                className: 'dark:bg-blue-600 bg-blue-400',
                icon: 'fa-solid fa-edit'
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
