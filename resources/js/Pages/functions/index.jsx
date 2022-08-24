import { useEffect, useState } from 'react'
import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import Table from '@/Components/Table'
import LinkButton from '@/Components/LinkButton'
import { Pagination } from 'flowbite-react'
import ConfirmDelete from '@/Components/ConfirmDelete'
import { useModalContext } from '@/Context/ModalContext'
import moment from 'moment'
import { ToPdf } from '@/Helpers/toPdf'
export default function Functions ({ auth, errors, functions: data }) {
  const [functions, setFunctions] = useState(null)
  const [page, setPage] = useState(1)
  const { openModal, setOpenModal, setModalValues } = useModalContext(false)
  useEffect(() => {
    console.log(data)
    let currentPage = getCurrentPage()
    currentPage = depureData(currentPage)
    setFunctions(currentPage)
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
    data.forEach((func) => {
      const newFunction = { ...func }
      newFunction.showtime = moment(newFunction.showtime).format('LLL')
      newData.push(newFunction)
    })
    return newData
  }
  const handleDelete = (id) => {
    setOpenModal(true)
    const func = functions.find((func) => func.id === id)
    setModalValues({
      key: `${func.movie},  ${func.hall},  ${func.showtime}`,
      title: 'function',
      id
    })
  }

  return (
    <>
      <ConfirmDelete routeName='functions.destroy' />
      <Authenticated
        auth={auth}
        errors={errors}
        header={
          <h2 className='font-semibold text-xl  leading-tight'>
            Manage Functions
          </h2>
        }
      >
        <Head title='Manage Functions' />

        <div className='py-12'>
          <div className='flex gap-5 flex-col mx-5 lg:w-[80%] lg:mx-auto'>
            <div className='flex justify-between'>
              <h3 className='dark:text-white text-lg'>List of Functions</h3>
              <div className='flex gap-5'>
                <button
                  className='bg-red-600 flex items-center justify-center  dark:bg-red-700 px-3 rounded font-bold text-slate-100'
                  onClick={() => { ToPdf('Tickets', ['ID', 'MOVIE', 'HALL', 'SHOWTIME'], depureData(data)) }}
                >
                  <i className='fa-regular fa-file-pdf text-xl' />
                </button>
                <LinkButton href='/functions/create'>add</LinkButton>
              </div>

            </div>
            <Table
              headers={['#', 'movie', 'hall', 'showtime', '']}
              data={functions}
              buttons={[
                {
                  model: 'functions',
                  name: '',
                  icon: 'fa-solid fa-eye',
                  className: 'dark:bg-green-700 bg-green-500',
                  isLink: true
                },
                {
                  model: 'functions',
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

            {functions && (
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
