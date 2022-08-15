import Hall from '@/Components/Hall'
import MovieCard from '@/Components/MovieCard'
import { useSeatsContext } from '@/Context/SeatsContext'
import Authenticated from '@/Layouts/Authenticated'
import { Head, Link } from '@inertiajs/inertia-react'
import { useEffect } from 'react'

const ChooseSeats = ({ auth, errors, function: f, seats }) => {
  const { seatsSelected, selected } = useSeatsContext()
  useEffect(() => {}, [selected])
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className='font-semibold text-xl  leading-tight'>Choose Tickets</h2>
      }
    >
      <Head title='Manage Clients' />
      <div className='py-8 px-6 flex flex-col gap-5 items-center xl:flex-row xl:items-start'>
        <MovieCard func={f} />
        <div className='px-10 w-full xl:w-[calc(100%-300px)]'>
          <Hall seats={seats} numberOfColumns={f.hall.number_of_columns} />
        </div>
      </div>
      <div className='pr-12 pb-10 flex justify-end'>
        {seatsSelected.length > 0
          ? (
            <Link
              href={`/functions/${f.id}/tickets/create`}
              method='get'
              data={{
                seats: seatsSelected
              }}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Continue
            </Link>
            )
          : (
            <button disabled>
              <a className='bg-gray-500  text-white font-bold py-2 px-4 rounded'>
                Continue
              </a>
            </button>
            )}
      </div>
    </Authenticated>
  )
}

export default ChooseSeats
