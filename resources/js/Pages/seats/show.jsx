import Description from '@/Components/Description'
import LinkButton from '@/Components/LinkButton'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import { useEffect, useState } from 'react'
export default function ShowSeat ({ auth, errors, seat: data }) {
  const [seat, setSeat] = useState(null)
  useEffect(() => {
    const formatted = formatData()
    console.log(formatted)
    setSeat(formatted)
  }, [])
  const formatData = () => {
    const newSeat = { }
    newSeat.place = `${data.row}${data.column}`
    newSeat.hall = data.hall.name
    return newSeat
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className='font-semibold text-xl  leading-tight'>Manage Seats</h2>
      }
    >
      <Head label='Manage Seats' />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col flex-wrap gap-5 py-5'>
        {seat && <Description title='Seat Information' object={seat} images={['poster']} />}
        <div className='flex justify-end'>
          <LinkButton href='/seats'>GO BACK</LinkButton>
        </div>
      </div>
    </Authenticated>
  )
}
