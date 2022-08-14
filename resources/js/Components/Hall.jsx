import Seat from './Seat'
const Hall = ({ seats = [], numberOfColumns = 12 }) => {
  const numberOfRows = (seats.length / numberOfColumns).toFixed(0)
  const rows = Array.from({ length: numberOfRows }, (_, i) =>
    (i + 10).toString(36).toUpperCase()
  )
  return (
    <div className='flex flex-col gap-24 '>
      <div className='flex flex-col gap-2 items-center'>
        <h1 className='text-5xl font-black text-slate-800 dark:text-slate-500 text-opacity-25'>
          Screen
        </h1>
        <div className='bg-white dark:bg-slate-600 w-[calc(100%-3.5rem)] h-4' />
      </div>
      <div className='flex'>
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
      </div>
    </div>
  )
}

export default Hall
