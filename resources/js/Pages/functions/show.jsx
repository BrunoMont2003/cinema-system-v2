import Description from '@/Components/Description'
import LinkButton from '@/Components/LinkButton'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import moment from 'moment'
import { useEffect, useState } from 'react'
export default function ShowFunction ({ auth, errors, function: data }) {
  const [func, setFunction] = useState(null)
  useEffect(() => {
    const formatted = formatData()
    setFunction(formatted)
  }, [])
  const formatData = () => {
    const newFunction = {}
    newFunction.movie = data.movie.title
    newFunction.hall = data.hall.name
    newFunction.date = moment(data.showtime).format('LL')
    newFunction.begins = moment(data.showtime).format('hh:mm a')
    newFunction.ends = moment(data.showtime).add(data.movie.duration, 'minutes').format('hh:mm a')
    return newFunction
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className='font-semibold text-xl  leading-tight'>
          Manage Functions
        </h2>
      }
    >
      <Head label='Manage Functions' />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col flex-wrap gap-5 py-5'>
        {func && <Description title='Function Information' object={func} />}
        <div className='flex justify-end'>
          <LinkButton href='/functions'>GO BACK</LinkButton>
        </div>
      </div>
    </Authenticated>
  )
}
