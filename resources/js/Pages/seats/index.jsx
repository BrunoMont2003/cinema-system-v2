import { useEffect, useState } from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Table from '@/Components/Table'
import LinkButton from '@/Components/LinkButton'
import { Pagination } from 'flowbite-react'
import ConfirmDelete from '@/Components/ConfirmDelete'
import { useModalContext } from '@/Context/ModalContext'

export default function Seats ({ auth, errors, seats: data }) {
  const [seats, setSeats] = useState(null)
  const [page, setPage] = useState(1)
  const { openModal, setOpenModal, setModalValues } = useModalContext(false)
  useEffect(() => {
    let currentPage = getCurrentPage()
    currentPage = depureData(currentPage)
    setSeats(currentPage)
  }, [page, openModal])
  const getCurrentPage = () => {
    const size = 10
    const offset = size * (page - 1)
    return data.slice(offset, offset + size)
  }

  const onPageChange = (page) => {
    setPage(page)
  }
  const depureData = (data) => {
    const newData = []
    data.forEach((seat) => {
      const newSeat = { ...seat }
      newSeat.hall = newSeat.hall.name
      delete newSeat.hall_id
      newData.push(newSeat)
    })
    return newData
  }
  const handleDelete = (id) => {
    setOpenModal(true)
    const seat = seats.find((seat) => seat.id === id)
    setModalValues({
      key: `${seat.row.toUpperCase()}${seat.column} - ${seat.hall}`,
      title: 'seat',
      id
    })
  }

  return (
    <>
      <ConfirmDelete routeName='seats.destroy' />
      <Authenticated
        auth={auth}
        errors={errors}
        header={
          <h2 className='font-semibold text-xl  leading-tight'>
            Manage Seats
          </h2>
        }
      >
        <Head title='Manage Seats' />

        <div className='py-12'>
          <div className='flex gap-5 flex-col mx-5 lg:w-[80%] lg:mx-auto'>
            <div className='flex justify-between'>
              <h3 className='dark:text-white text-lg'>List of Seats</h3>
              <LinkButton href='/seats/create'>add</LinkButton>
            </div>
            <Table
              headers={['#', 'row', 'column', 'hall', '']}
              data={seats}
              buttons={[
                {
                  model: 'seats',
                  name: '',
                  icon: 'fa-solid fa-eye',
                  className: 'dark:bg-green-700 bg-green-500',
                  isLink: true
                },
                {
                  model: 'seats',
                  name: 'edit',
                  className: 'dark:bg-blue-600 bg-blue-400',
                  icon: 'fa-solid fa-edit',
                  isLink: true
                },
                {
                  name: 'delete',
                  className: 'dark:bg-red-600 bg-red-400',
                  icon: 'fa-solid fa-trash',
                  onClick: handleDelete
                }
              ]}
            />

            {seats && (
              <div className='flex items-center justify-center text-center'>
                <Pagination
                  currentPage={page}
                  layout='table'
                  onPageChange={onPageChange}
                  showIcons
                  totalPages={Math.ceil(data.length / 10)}
                />
              </div>
            )}
          </div>
        </div>
      </Authenticated>
    </>
  )
}
