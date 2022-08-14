import { Tooltip } from 'flowbite-react'
import { useState } from 'react'
const Seat = ({ seat }) => {
  const [status, setStatus] = useState(seat.status)
  const handleChange = () => {
    setStatus(status === 'selected' ? 'free' : 'selected')
  }
  return (
    <>
      <div className=''>
        <Tooltip content={`${seat.row}${seat.column}`} style='light'>
          {status === 'free' && (
            <button
              onClick={handleChange}
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
              className='w-[32px] h-[32px] rounded-full bg-blue-800'
            />
          )}
        </Tooltip>
      </div>
    </>
  )
}

export default Seat
