import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Form from '@/Components/Form'
import { useEffect, useState } from 'react'
import moment from 'moment'

const formatSeats = (seats) => {
  return seats.map((seat) => {
    return {
      value: seat.id,
      label: seat.row + '-' + seat.column
    }
  })
}
export default function EditTicket ({
  auth,
  errors,
  functions,
  clients,
  seats: allSeats,
  ticket
}) {
  const initialValues = {
    id: ticket.id,
    client: ticket.client_id,
    function: ticket.funxtion_id,
    seat: ticket.seat_id
  }
  const getSeatsFromFunction = (functionId) => {
    const func = functions.find((func) => func.id === functionId)
    const hallId = func.hall.id
    const functionSeats = allSeats.filter((seat) => {
      return seat.hall_id === hallId
    })
    return functionSeats
  }
  const [seats, setSeats] = useState([
    ...formatSeats(getSeatsFromFunction(ticket.funxtion_id))
  ])
  const [seatsChanged, setSeatsChanged] = useState(false)
  useEffect(() => {}, [seatsChanged])
  const [inputs, setInputs] = useState([
    {
      name: 'client',
      label: 'Client',
      type: 'select',
      options: [...clients].map((client) => {
        return {
          value: client.id,
          label: client.first_name + ' ' + client.last_name
        }
      })
    },
    {
      name: 'function',
      label: 'Function',
      type: 'select',
      options: [...functions].map((f) => {
        return {
          value: f.id,
          label:
            f.movie.title +
            ' - ' +
            f.hall.name +
            ' - ' +
            moment(f.showtime).format('LLL')
        }
      })
    },
    {
      name: 'seat',
      label: 'Seat',
      type: 'select',
      options: [...seats]
    }
  ])
  const handleFunctionOnChange = (e) => {
    const functionId = parseInt(e.target.value)
    const functionSeats = getSeatsFromFunction(functionId)
    console.log(functionSeats)
    setSeats(functionSeats)
    setSeatsChanged(!seatsChanged)
    setInputs((inputs) =>
      inputs.map((input) => {
        if (input.name === 'seat') {
          input.options = functionSeats.map((seat) => {
            return {
              value: seat.id,
              label: seat.row + '-' + seat.column
            }
          })
        }
        return input
      })
    )
  }

  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className='font-semibold text-xl  leading-tight'>Manage Tickets</h2>
      }
    >
      <Head title='Manage Tickets' />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col flex-wrap gap-5 py-5'>
        <h4 className='dark:text-white'>Edit Ticket</h4>
        <Form
          routeName='tickets.update'
          inputs={inputs}
          initialValues={initialValues}
          extraOnChanges={[
            {
              input: 'function',
              onChange: handleFunctionOnChange
            }
          ]}
          goBackRoute='/tickets'
          method='put'
        />
      </div>
    </Authenticated>
  )
}
