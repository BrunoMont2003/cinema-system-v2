import MovieCard from '@/Components/MovieCard'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
export default function Premiere ({ auth, errors, movies }) {
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className='font-semibold text-xl  leading-tight'>Premiere</h2>
      }
    >
      <Head title='Manage Clients' />

      <div className='py-12'>
        <section className='flex flex-wrap items-center justify-center gap-5 mx-5 lg:w-[80%] lg:mx-auto'>
          <h1 className='text-3xl text-center dark:text-slate-100 w-full mb-5'>Movies in premiere</h1>
          {movies.length === 0 && <p>No movies were found</p>}
          {movies.length > 0 &&
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </section>
      </div>
    </Authenticated>
  )
}
