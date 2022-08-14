import { Link } from '@inertiajs/inertia-react'
import moment from 'moment'

const ResultList = ({ functions }) => {
  return (
    <div className='mx-5 my-10 md:mx-10'>
      <h2 className='text-xl mt-5 mb-10 font-bold text-slate-700 dark:text-slate-300'>
        Showtimes Availables
      </h2>
      <article className='flex flex-wrap gap-5'>
        {functions.map((function_, index) => (
          <Link
            key={index}
            className='rounded-lg border-2 border-gray-500 dark:border-gray-400 text-gray-500 dark:text-gray-400 dark:hover:text-white dark:hover:border-white w-36 h-12 grid grid-cols-4 place-content-center text-center hover:border-black duration-200 ease-in-out hover:text-black'
            href={`/functions/${function_.id}/seats`}
          >
            <span className='border-r-2 border-b-slate-500 col-span-3 bar duration-200 ease-in-out'>
              {moment(function_.showtime).format('h:mm a')}
            </span>
            <i className='fas fa-print col-span-1' />
          </Link>
        ))}
      </article>
    </div>
  )
}

export default ResultList
