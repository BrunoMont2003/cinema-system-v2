import { useEffect, useState } from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Table from '@/Components/Table'
import LinkButton from '@/Components/LinkButton'
import { Pagination } from 'flowbite-react'
import ConfirmDelete from '@/Components/ConfirmDelete'
import { useModalContext } from '@/Context/ModalContext'
import moment from 'moment'

export default function Tickets ({ auth, errors, tickets: data }) {
  const [tickets, setTickets] = useState(null)
  const [page, setPage] = useState(1)
  const { openModal, setOpenModal, setModalValues } = useModalContext(false)
  useEffect(() => {
    let currentPage = getCurrentPage()
    currentPage = depureData(currentPage)
    setTickets(currentPage)
  }, [page, openModal])
  const getCurrentPage = () => {
    const size = 10
    const offset = size * (page - 1)
    return data.slice(offset, offset + size)
  }

  const onPageChange = (page) => {
    setPage(page)
  }
  const depureData = (data) => {
    const newData = []
    data.forEach((ticket) => {
      const newTicket = { ...ticket }
      newTicket.date = moment(newTicket.showtime).format('LL')
      newTicket.time = moment(newTicket.showtime).format('hh:mm a')
      delete newTicket.showtime
      newData.push(newTicket)
    })
    return newData
  }
  const handleDelete = (id) => {
    setOpenModal(true)
    const ticket = tickets.find((ticket) => ticket.id === id)
    setModalValues({
      key: `${ticket.row.toUpperCase()}${ticket.column} - ${ticket.hall}`,
      title: 'ticket',
      id
    })
  }

  return (
    <>
      <ConfirmDelete routeName='tickets.destroy' />
      <Authenticated
        auth={auth}
        errors={errors}
        header={
          <h2 className='font-semibold text-xl  leading-tight'>
            Manage Tickets
          </h2>
        }
      >
        <Head title='Manage Tickets' />

        <div className='py-12'>
          <div className='flex gap-5 flex-col mx-5 lg:w-[80%] lg:mx-auto'>
            <div className='flex justify-between'>
              <h3 className='dark:text-white text-lg'>List of Tickets</h3>
              <LinkButton href='/tickets/create'>add</LinkButton>
            </div>
            <Table
              headers={['#', 'client', 'movie', 'hall', 'seat', 'date', 'time', '']}
              data={tickets}
              buttons={[
                {
                  model: 'tickets',
                  name: '',
                  icon: 'fa-solid fa-eye',
                  className: 'dark:bg-green-700 bg-green-500',
                  isLink: true
                },
                {
                  model: 'tickets',
                  name: 'edit',
                  className: 'dark:bg-blue-600 bg-blue-400',
                  icon: 'fa-solid fa-edit',
                  isLink: true
                },
                {
                  name: 'delete',
                  className: 'dark:bg-red-600 bg-red-400',
                  icon: 'fa-solid fa-trash',
                  onClick: handleDelete
                }
              ]}
            />

            {tickets && (
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
    </>
  )
}
