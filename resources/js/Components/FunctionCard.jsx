import moment from 'moment'

const FunctionCard = ({ func }) => {
  return (
    <div className='p-5 flex flex-col gap-2 items-center  w-[300px] dark:text-slate-50 '>
      <figure className='w-[164px] h-[164px] rounded-full overflow-hidden dark:shadow-white shadow-md mb-2'>
        <img
          className='w-full h-full object-cover '
          src={func.movie.poster_path}
          alt={func.movie.title}
        />
      </figure>
      <div className='flex flex-col gap-1'>
        <h1 className='text-3xl font-black mb-2'>{func.movie.title}</h1>
        <div className='flex gap-3 items-center'>
          <i className='fa-regular fa-calendar' />
          <span>
            {`${moment(func.showtime).calendar().split(' ')[0]}, ${moment(
              func.showtime
            ).format('ll')}`}
          </span>
        </div>
        <div className='flex gap-3 items-center'>
          <i className='fa-regular fa-clock' />
          <span>{moment(func.showtime).format('LT')}</span>
        </div>
        <div className='flex gap-3 items-center'>
          <i className='fa-regular fa-circle' />
          <span className='uppercase'>{func.hall.name}</span>
        </div>
        <hr className='mt-4 dark:border-slate-600' />
      </div>
    </div>
  )
}

export default FunctionCard
