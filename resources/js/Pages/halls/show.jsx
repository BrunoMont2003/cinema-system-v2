import Description from '@/Components/Description'
import LinkButton from '@/Components/LinkButton'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import { useEffect, useState } from 'react'
export default function ShowHall ({ auth, errors, hall: data }) {
  const [hall, setHall] = useState(null)
  useEffect(() => {
    console.log(data)
    const formatted = formatData()
    console.log(formatted)
    setHall(formatted)
  }, [])
  const formatData = () => {
    const newHall = { }
    newHall.name = data.name
    newHall.capacity = data.capacity
    newHall['numer of columns'] = data.number_of_columns
    return newHall
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className='font-semibold text-xl  leading-tight'>Manage Halls</h2>
      }
    >
      <Head label='Manage Halls' />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col flex-wrap gap-5 py-5'>
        {hall && <Description title='Hall Information' object={hall} />}
        <div className='flex justify-end'>
          <LinkButton href='/halls'>GO BACK</LinkButton>
        </div>
      </div>
    </Authenticated>
  )
}
