import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Form from '@/Components/Form'
import LinkButton from '@/Components/LinkButton'
import { useEffect, useState } from 'react'
import moment from 'moment'

export default function CreateTicket ({
  auth,
  errors,
  functions,
  clients,
  seats: allSeats
}) {
  const [seats, setSeats] = useState([])
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
            moment(f.time).format('LLL')
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
    const hallId = [...functions].find((f) => f.id === functionId).hall.id
    const functionSeats = allSeats.filter((seat) => {
      return seat.hall_id === hallId
    })
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

  const initialValues = {
    client: '',
    function: '',
    seat: ''
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
        <h4 className='dark:text-white'>Add Ticket</h4>
        <Form
          routeName='tickets.store'
          inputs={inputs}
          initialValues={initialValues}
          extraOnChanges={[
            {
              input: 'function',
              onChange: handleFunctionOnChange
            }
          ]}
          goBackRoute='/tickets'
        />
      </div>
    </Authenticated>
  )
}
