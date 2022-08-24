import Ticket from '@/Components/Ticket'
import { useSeatsContext } from '@/Context/SeatsContext'
import Authenticated from '@/Layouts/Authenticated'
import { Head, Link } from '@inertiajs/inertia-react'
import { useEffect, useRef } from 'react'
import { getImages } from '@/Helpers/images'
import { ImagesToPdf } from '@/Helpers/toPdf'
const TicketsCreated = ({ auth, errors, function: f, tickets, client }) => {
  const { setSeatsSelected } = useSeatsContext()
  const ticketsRef = useRef([])
  useEffect(() => {
    setSeatsSelected([])
    ticketsRef.current = ticketsRef.current.slice(0, tickets.length)
  }, [tickets])

  const handleDownload = async () => {
    const images = await getImages(ticketsRef.current)
    const title = 'Tickets'
    ImagesToPdf(title, images)
    // const pdf = await ToPdf(tickets, images, client)
    // pdf.save('tickets.pdf')
    // }
  }
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
        {tickets.map((ticket, i) => (
          <div key={ticket.id} ref={el => ticketsRef.current[i] = el}>
            <Ticket key={ticket.id} func={f} ticket={ticket} client={client} />
          </div>
        ))}
      </div>
      <div className='flex pb-5 w-full justify-center gap-5 items-center'>
        <Link
          href='/dashboard'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Back to Dashboard
        </Link>
        <button
          onClick={handleDownload}
          className='px-3 py-[8px] rounded bg-red-600 font-bold text-slate-200'
        >
          Download PDF
        </button>
      </div>
    </Authenticated>
  )
}

export default TicketsCreated
