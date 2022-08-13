import Description from '@/Components/Description'
import LinkButton from '@/Components/LinkButton'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import moment from 'moment'
import { useEffect, useState } from 'react'
export default function ShowTicket ({
  auth,
  errors,
  movie,
  client,
  function: f,
  seat,
  hall
}) {
  const [ticket, setTicket] = useState(null)
  useEffect(() => {
    const formatted = formatData()
    setTicket(formatted)
  }, [])
  const formatData = () => {
    const newTicket = { }
    newTicket.movie = movie.title
    newTicket.client = client.first_name + ' ' + client.last_name
    newTicket.date = moment(f.showtime).format('LL')
    newTicket.time = moment(f.showtime).format('LT')
    newTicket.hall = hall.name
    newTicket.seat = seat.row + seat.column
    return newTicket
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className='font-semibold text-xl  leading-tight'>Manage Tickets</h2>
      }
    >
      <Head label='Manage Tickets' />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col flex-wrap gap-5 py-5'>
        {ticket && (
          <Description
            title='Ticket Information'
            object={ticket}
          />
        )}
        <div className='flex justify-end'>
          <LinkButton href='/tickets'>GO BACK</LinkButton>
        </div>
      </div>
    </Authenticated>
  )
}
