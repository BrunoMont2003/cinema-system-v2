import React, { useEffect, useState } from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Table from '@/Components/Table'
import LinkButton from '@/Components/LinkButton'
import { Pagination } from 'flowbite-react'
import { isObject } from 'lodash'
import moment from 'moment'

export default function Tickets ({ auth, errors, tickets: data }) {
  const [tickets, setTickets] = useState(null)
  const [page, setPage] = useState(1)
  useEffect(() => {
    const size = 10
    const offset = size * (page - 1)
    data.slice(offset, offset + size).forEach(ticket => {
      if (isObject(ticket.client) || isObject(ticket.movie) || isObject(ticket.hall) || isObject(ticket.seat || isObject(ticket.funxtion))) {
        const client = ticket.client.first_name + ' ' + ticket.client.last_name
        const movie = ticket.movie.title
        const hall = ticket.hall.name
        const seat = ticket.seat.row + '' + ticket.seat.column
        const date = moment(ticket.funxtion.showtime).format('LLL')
        delete ticket.client_id
        delete ticket.client
        delete ticket.movie_id
        delete ticket.movie
        delete ticket.hall_id
        delete ticket.hall
        delete ticket.seat_id
        delete ticket.seat
        delete ticket.funxtion_id
        delete ticket.funxtion
        ticket.client = client
        ticket.movie = movie
        ticket.hall = hall
        ticket.seat = seat
        ticket.funxtion = date
      }
    })

    setTickets(data.slice(offset, offset + size))
  }, [page])
  const onPageChange = (page) => {
    setPage(page)
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={<h2 className='font-semibold text-xl  leading-tight'>Manage Tickets</h2>}
    >
      <Head title='Manage Tickets' />

      <div className='py-12'>
        <div className='flex gap-5 flex-col mx-5 lg:w-[80%] lg:mx-auto'>
          <div className='flex justify-between'>
            <h3 className='dark:text-white text-lg'>List of Tickets</h3>
            <LinkButton href='/tickets/create'>add</LinkButton>
          </div>
          <Table headers={['#', 'client', 'movie', 'hall', 'seat', 'showtime']} data={tickets} />
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
  )
}
