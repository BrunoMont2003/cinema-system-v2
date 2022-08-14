import Hall from '@/Components/Hall'
import MovieCard from '@/Components/MovieCard'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import { useEffect } from 'react'

const ChooseSeats = ({ auth, errors, function: f, seats }) => {
  useEffect(() => {}, [])
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
    </Authenticated>
  )
}

export default ChooseSeats
