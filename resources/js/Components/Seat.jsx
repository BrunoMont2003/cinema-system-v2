import { useSeatsContext } from '@/Context/SeatsContext'
import { Tooltip } from 'flowbite-react'
import { useState } from 'react'
const Seat = ({ seat, isExample }) => {
  const [status, setStatus] = useState(seat.status)
  const { seatsSelected, setSeatsSelected, setSelected } =
    useSeatsContext()
  const handleChange = ({ target: { dataset } }) => {
    const seatId = dataset.seatId
    // if the seat is already in the array of seats selected then remove it from the array
    if (seatsSelected.includes(seatId)) {
      setSeatsSelected(seatsSelected.filter((id) => id !== seatId))
      setStatus('free')
    } else {
      setSeatsSelected([...seatsSelected, seatId])
      setStatus('selected')
    }
    setSelected(seatId)
  }
  if (isExample && status === 'free') {
    return (
      <span className='w-[32px] h-[32px] border rounded-full border-slate-600 dark:border-white' />
    )
  }
  if (isExample && status === 'busy') {
    return <span className='w-[32px] h-[32px] rounded-full bg-red-400' />
  }
  if (isExample && status === 'selected') {
    return (
      <span className='w-[32px] h-[32px] rounded-full bg-blue-800 dark:bg-blue-400' />
    )
  }
  return (
    <>
      <Tooltip content={`${seat.row}${seat.column}`} style='light'>
        {status === 'free' && (
          <button
            onClick={handleChange}
            data-seat-id={seat.id}
            className='w-[32px] h-[32px] border rounded-full border-slate-600 dark:border-white'
          />
        )}
        {status === 'busy' && (
          <button
            disabled
            className='w-[32px] h-[32px] rounded-full bg-red-400'
          />
        )}
        {status === 'selected' && (
          <button
            onClick={handleChange}
            data-seat-id={seat.id}
            className='w-[32px] h-[32px] rounded-full bg-blue-800 dark:bg-blue-400'
          />
        )}
      </Tooltip>
    </>
  )
}

export default Seat
