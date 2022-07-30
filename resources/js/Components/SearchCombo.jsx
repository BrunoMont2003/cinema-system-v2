import { useForm } from '@inertiajs/inertia-react'
import moment from 'moment'
import Button from './Button'

const SearchCombo = ({ movies = [], days = [], initialValues }) => {
  const { data, setData, get, processing, errors } = useForm({
    movie: initialValues.movie.id ?? '',
    date: initialValues.date ?? ''
  })
  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)
  }
  const submit = (e) => {
    e.preventDefault()

    get(route('dashboard', { ...data, day: moment(data.day).format('YYYY-MM-DD') }))
  }
  return (
    <div className='py-12 flex justify-center items-center'>
      <form className='grid grid-cols-8 shadow-all rounded-md lg:w-3/4 border border-slate-300 overflow-hidden px-5 bg-white dark:bg-gray-800 w-full'>
        <div className='bg-white dark:bg-gray-800 overflow-hidden col-span-3'>
          <select
            id='movie' name='movie'
            onChange={onHandleChange}
            value={data.movie}
            className='border-0 block py-8 px-0 w-full text-sm text-gray-500 dark:text-gray-100 bg-transparent   appearance-none focus:outline-none focus:ring-0 focus:border-b-2 focus:border-gray-200 focus:border-b-slate-700 peer'
          >
            <option disabled>Choose a Movie</option>
            {
                movies.map((movie, index) => (
                  <option key={index} value={movie.id}>{movie.title}</option>
                ))

            }
          </select>
        </div>
        <div className='bg-white dark:bg-gray-800 overflow-hidden col-span-3'>
          <select
            onChange={onHandleChange}
            value={data.date}
            id='date' name='date'
            className='border-0 block py-8 px-0 w-full text-sm text-gray-500 dark:text-gray-100 bg-transparent  appearance-none focus:outline-none focus:ring-0 focus:border-b-2 focus:border-gray-200 focus:border-b-slate-700 peer border-r-0'
          >
            <option disabled>Choose a Day</option>
            {
                days.map((day, index) => (
                  <option key={index} value={day}>{moment(day).format('LL')}</option>
                ))
            }
          </select>
        </div>
        <div className='bg-white dark:bg-gray-800 overflow-hidden col-span-2 flex justify-end items-center'>
          <Button className='h-12'>
            <i className='fas fa-filter text-white dark:text-gray-800' />
            <span className='ml-5 font-black'>FILTER</span>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SearchCombo
