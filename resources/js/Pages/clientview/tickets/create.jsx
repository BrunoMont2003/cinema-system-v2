import MovieCard from '@/Components/MovieCard'
import Select from '@/Components/Select'
import Authenticated from '@/Layouts/Authenticated'
import { Inertia } from '@inertiajs/inertia'
import { Head, Link } from '@inertiajs/inertia-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const CreateTickets = ({ clients, auth, errors, function: f, seats }) => {
  const [formData, setFormData] = useState({
    client_id: '',
    seats: []
  })
  useEffect(() => {}, [])
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handleToggleSeat = (e) => {
    const { value } = e.target
    const seats = formData.seats.includes(value)
      ? formData.seats.filter((seat) => seat !== value)
      : [...formData.seats, value]
    setFormData({ ...formData, seats })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // get an array of id's of the seats selected
    const seats = formData.seats.map((seat) => parseInt(seat))
    console.log(seats)
    Inertia.post(route('clientview.tickets.store', f.id), formData, {
      onError: (errors) => {
        displayErrors(errors)
      },
      onSuccess: () => {
        toast.success('Ticket created successfully')
      }
    })
  }

  const displayErrors = (errors = {}) => {
    Object.keys(errors).forEach((key) => {
      toast.error(errors[key], {
        autoClose: false
      })
    })
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className='font-semibold text-xl  leading-tight'>Choose Client</h2>
      }
    >
      <Head title='Manage Clients' />
      <div className='py-8 sm:px-6 flex flex-col gap-5 items-center xl:flex-row xl:items-center max-w-7xl'>
        <MovieCard func={f} />
        <form
          className='flex flex-col gap-5 px-10 w-full'
          onSubmit={handleSubmit}
        >
          <div className='grid   grid-cols-2 gap-5 '>
            <label
              htmlFor='client_id'
              className='text-2xl font-bold dark:text-slate-300 col-span-2'
            >
              Client
            </label>
            <div className='col-span-2 lg:col-span-1'>
              <Select
                defaultValue={formData.client_id}
                handleChange={handleInputChange}
                required
                name='client_id'
                className='w-full  bg-transparent border-b-2 border-gray-500 focus:border-blue-500 text-gray-700 py-2 pr-4 pl-4 rounded'
                options={clients.map((client) => {
                  return {
                    value: client.id,
                    label: client.first_name + ' ' + client.last_name
                  }
                })}
              >
                <option value=''>Select Client</option>
              </Select>
            </div>
          </div>
          <div className='grid gap-5 lg:grid-cols-2 w-full'>
            <span className='text-2xl font-bold dark:text-slate-300 col-span-2'>
              Seats
            </span>

            {seats.map((seat) => {
              return (
                <label
                  htmlFor={seat.id}
                  key={seat.id}
                  className='border border-slate-500 p-3 flex justify-between items-center rounded'
                >
                  <span className='text-2xl font-bold dark:text-slate-300'>
                    {seat.row + seat.column}
                  </span>
                  <input
                    type='checkbox'
                    id={seat.id}
                    name='seats'
                    value={seat.id}
                    onChange={handleToggleSeat}
                  />
                </label>
              )
            })}
          </div>
          <div className='flex gap-3 items-center'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Create Tickets
            </button>
            <Link
              className='bg-gray-500  text-white font-bold py-2 px-4 rounded'
              href={`/functions/${f.id}/seats`}
            >
              Go Back
            </Link>
          </div>
        </form>
      </div>
    </Authenticated>
  )
}

export default CreateTickets
