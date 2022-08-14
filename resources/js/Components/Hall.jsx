import { useEffect } from 'react'
import { useSeatsContext } from '@/Context/SeatsContext'
import Seat from './Seat'
const Hall = ({ seats = [], numberOfColumns = 12 }) => {
  const { seatsSelected, selected } = useSeatsContext()
  const numberOfRows = (seats.length / numberOfColumns).toFixed(0)
  const rows = Array.from({ length: numberOfRows }, (_, i) =>
    (i + 10).toString(36).toUpperCase()
  )
  useEffect(() => {}, [selected])

  return (
    <section className='flex flex-col gap-24 mt-8'>
      <article className='flex flex-col gap-2 items-center'>
        <h1 className='text-5xl font-black text-slate-800 dark:text-slate-500 text-opacity-25'>
          Screen
        </h1>
        <div className='bg-white dark:bg-slate-600 w-[calc(100%-3.5rem)] h-4' />
      </article>
      <article className='flex'>
        <div className='flex flex-col gap-3 items-start py-5'>
          {rows.map((row, i) => (
            <div key={i} className=''>
              <div className='w-[32px] h-[32px]'>
                <h1 className='text-2xl font-black text-slate-800 dark:text-slate-500 text-opacity-25'>
                  {row}
                </h1>
              </div>
            </div>
          ))}
        </div>
        <div
          className='w-full p-5 gap-2 grid overflow-x-scroll '
          style={{
            gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`
          }}
        >
          {seats.map((seat, index) => {
            return <Seat key={index} seat={seat} />
          })}
        </div>
        <div className='flex flex-col gap-3 items-start py-5'>
          {rows.map((row, i) => (
            <div key={i} className=''>
              <div className='w-[32px] h-[32px]'>
                <h1 className='text-2xl font-black text-slate-800 dark:text-slate-500 text-opacity-25'>
                  {row}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </article>
      <article className='flex gap-5 flex-wrap items-center justify-center w-full pb-5'>
        <div className='flex items-center gap-2'>
          <Seat seat={{ status: 'free' }} isExample />
          <span className='text-slate-500 dark:text-slate-100'>Available</span>
        </div>
        <div className='flex items-center gap-2'>
          <Seat seat={{ status: 'busy' }} isExample />
          <span className='text-slate-500 dark:text-slate-100'>Busy</span>
        </div>
        <div className='flex items-center gap-2'>
          <Seat seat={{ status: 'selected' }} isExample />
          <span className='text-slate-500 dark:text-slate-100'>Selected</span>
        </div>
      </article>
      {seatsSelected.length > 0 && (
        <article>
          <h3 className='text-slate-800 text-xl font-black dark:text-slate-200 capitalize'>
            selected Seats{' '}
          </h3>
          <div className='flex  gap-2 items-center'>
            {seatsSelected.map((seatId, index) => {
              const seat = seats.find((seat) => seat.id === parseInt(seatId))
              return (
                <span
                  className='text-slate-600 dark:text-slate-500 font-bold'
                  key={index}
                >
                  {seat.row}
                  {seat.column}
                </span>
              )
            })}
          </div>
        </article>
      )}
    </section>
  )
}

export default Hall
