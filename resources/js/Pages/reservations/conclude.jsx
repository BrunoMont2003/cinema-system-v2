import React from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head, useForm } from '@inertiajs/inertia-react'
import moment from 'moment'
import LinkButton from '@/Components/LinkButton'
import Button from '@/Components/Button'

export default function ReservationConclude ({ auth, errors, reservation, client, room }) {
  const { put, setData } = useForm()
  const submit = (e) => {
    e.preventDefault()
    setData({
      status: 'finished'
    })
    reservation.status = 'finished'
    put(route('reservations.update', reservation))
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={<h2 className='font-semibold text-xl  leading-tight'>Manage Reservations</h2>}
    >
      <Head title='Manage Reservations' />

      <div className='py-12'>
        <div className='flex gap-5 flex-col mx-5 lg:w-[80%] lg:mx-auto'>
          <div className='flex gap-5 flex-col dark:text-white'>
            {
                reservation.status === 'finished'
                  ? <>
                    <span>This reservation is already finished</span>
                    <LinkButton className='w-24' href='/reservations'>Go back</LinkButton>
                  </>
                  : <>
                    <h3 className=' text-lg'>¿Do you want to conclude the reservation?</h3>
                    <div>
                      <span className='font-bold mr-5'>Client: </span>
                      <span>{client.name} </span>
                    </div>
                    <div>
                      <span className='font-bold mr-5'>Room: </span>
                      <span>{room.number} </span>
                    </div>
                    <div>
                      <span className='font-bold mr-5'>Begin Date: </span>
                      <span>{moment(reservation.begin).format('LL')} </span>
                    </div>
                    <div>
                      <span className='font-bold mr-5'>End Date: </span>
                      <span>{moment(reservation.end).format('LL')} </span>
                    </div>
                    <form onSubmit={submit} className='flex gap-5 items-center'>
                      <Button className='font-bold bg-red-500 dark:bg-red-600 py-3 text-lg'>Yes, Conclude</Button>
                      <LinkButton href='/reservations'>No, Cancel</LinkButton>
                    </form>
                    </>
            }
          </div>
        </div>
      </div>
    </Authenticated>
  )
}
