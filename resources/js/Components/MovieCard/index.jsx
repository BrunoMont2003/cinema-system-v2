import { toHoursAndMinutes } from '@/Helpers/time'
import { Link } from '@inertiajs/inertia-react'
import moment from 'moment'
import './style.css'
const MovieCard = ({ movie }) => {
  return (
    <div className='border w-[230px] h-[450px] dark:border-slate-600 '>
      <figure className='h-[340px] w-full relative'>
        <img
          src={movie.poster_path}
          className='h-full w-full object-cover'
          alt={movie.title}
        />
        <div className='absolute top-0 w-full h-full flex flex-col items-center justify-center gap-5 bg-slate-900 dark:bg-slate-300 bg-opacity-50 dark:bg-opacity-50 opacity-0 button-group'>
          <Link method='GET' href={`/dashboard?movie=${movie.id}&date=${moment().format('YYYY-MM-DD')}`} className='px-3 py-2 w-[8rem] rounded bg-red-500 hover:bg-red-600 duration-200 ease-in-out text-center'>Ticket</Link>
          <Link href={`/movies/${movie.id}`} className='px-3 py-2 w-[8rem] rounded bg-blue-500 hover:bg-blue-600 duration-200 ease-in-out text-center'>See details</Link>
        </div>
      </figure>
      <div className='p-4'>
        <h3 className='text-xl font-semibold dark:text-white'>{movie.title}</h3>
        <span className='text-sm dark:text-gray-200'>
          {toHoursAndMinutes(movie.duration)}
        </span>
      </div>
    </div>
  )
}

export default MovieCard
