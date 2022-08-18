import ResultList from '@/Components/ResultList'
import SearchCombo from '@/Components/SearchCombo'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
export default function ClientView ({ auth, errors, movies, days, functions, movie, date }) {
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={<h2 className='font-semibold text-xl  leading-tight'>Dashboard</h2>}
    >
      <Head title='Manage Clients' />

      <div className='py-12'>
        <section className='flex gap-5 flex-col mx-5 lg:w-[80%] lg:mx-auto'>
          <h1 className='text-3xl text-center dark:text-slate-100'>Find a function for the client</h1>
          <SearchCombo movies={movies} days={days} initialValues={{ movie, date }} />
          {
            functions && functions.length > 0 && (<ResultList functions={functions} />)
          }
          {
            functions && functions.length === 0 && (<h2 className='dark:text-white'> No functions Availables </h2>)
          }
        </section>
      </div>
    </Authenticated>
  )
}
