import Description from '@/Components/Description'
import LinkButton from '@/Components/LinkButton'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import moment from 'moment'
import { useEffect, useState } from 'react'
export default function ShowMovie ({ auth, errors, movie: data }) {
  const [movie, setMovie] = useState(null)
  useEffect(() => {
    const formatted = formatData()
    console.log(formatted)
    setMovie(formatted)
  }, [])
  const formatData = () => {
    const newMovie = { }
    newMovie.title = data.title
    newMovie.description = data.description
    newMovie['release date'] = moment(data.release_date).format('LL')
    newMovie.director = data.director
    newMovie.poster = data.poster_path
    return newMovie
  }
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className='font-semibold text-xl  leading-tight'>Manage Movies</h2>
      }
    >
      <Head label='Manage Movies' />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col flex-wrap gap-5 py-5'>
        {movie && <Description title='Movie Information' object={movie} images={['poster']} />}
        <div className='flex justify-end'>
          <LinkButton href='/movies'>GO BACK</LinkButton>
        </div>
      </div>
    </Authenticated>
  )
}
