import Ticket from '@/Components/Ticket'
import Authenticated from '@/Layouts/Authenticated'
import { Head, Link } from '@inertiajs/inertia-react'
import { useEffect } from 'react'

const TicketsCreated = ({ auth, errors, function: f, tickets, client }) => {
  useEffect(() => {
    console.log(tickets)
    console.log(client)
  }, [])
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className='font-semibold text-xl  leading-tight'>
          Tickets Created Successfully
        </h2>
      }
    >
      <Head title='Manage Clients' />
      <div className='py-8 lg:py-16 flex flex-col gap-5 items-center justify-center px-10'>
        {tickets.map((ticket) => (
          <Ticket key={ticket.id} func={f} ticket={ticket} client={client} />
        ))}
      </div>
      <div className='flex pb-5 w-full justify-center'>
        <Link
          href='/dashboard'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Back to Dashboard
        </Link>
      </div>
    </Authenticated>
  )
}

export default TicketsCreated
