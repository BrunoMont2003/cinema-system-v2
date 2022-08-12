import Description from '@/Components/Description'
import LinkButton from '@/Components/LinkButton'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import moment from 'moment'
import { useEffect, useState } from 'react'
export default function ShowClient ({ auth, errors, client: data }) {
  const [client, setClient] = useState(null)
  useEffect(() => {
    const formatted = formatData()
    console.log(formatted)
    setClient(formatted)
  }, [])
  const formatData = () => {
    const newClient = { }
    newClient['full name'] = data.first_name + ' ' + data.last_name
    newClient.dni = data.dni
    newClient['birth date'] = moment(data.birth_date).format('LL')
    return newClient
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className='font-semibold text-xl  leading-tight'>Manage Clients</h2>
      }
    >
      <Head label='Manage Clients' />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col flex-wrap gap-5 py-5'>
        {client && <Description title='Client Information' object={client} />}
        <div className='flex justify-end'>
          <LinkButton href='/clients'>GO BACK</LinkButton>
        </div>
      </div>
    </Authenticated>
  )
}
