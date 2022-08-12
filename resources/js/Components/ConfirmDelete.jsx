import { Modal } from 'flowbite-react'
import { useModalContext } from '@/Context/ModalContext'
import { Inertia } from '@inertiajs/inertia'

const ConfirmDelete = ({ routeName }) => {
  const { modalValues, openModal, setOpenModal } = useModalContext()
  const handleDelete = async (e) => {
    e.preventDefault()
    const { id } = modalValues
    Inertia.delete(route(routeName, id), {
      onError: (error) => {
        console.log(error)
      },
      onProgress: (progress) => {
        console.log('progress')
        console.log(progress)
      },
      onSuccess: (response) => {
        setOpenModal(false)
      }
    })
  }
  return (
    <Modal
      show={openModal}
      size='md'
      popup
      position='center'
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header />
      <Modal.Body>
        <div className='text-center'>
          <i className='fa-solid fa-question mx-auto mb-4 text-4xl text-gray-400 dark:text-gray-200' />
          <h3 className='mb-2 text-lg font-normal text-gray-500 dark:text-gray-400'>
            Are you sure you want to delete this {modalValues.title}?
          </h3>
          <p className='text-xs text-gray-700 mb-5'>
            <b> {modalValues.key}</b> will be removed from the system.
          </p>
          <form className='flex justify-center gap-4' onSubmit={handleDelete}>
            <button
              type='submit'
              className='px-5 py-2 bg-red-500 rounded text-gray-100 font-bold'
            >
              Yes, I'm sure
            </button>
            <button
              className='px-5 py-2 bg-blue-500 rounded text-gray-100 font-bold'
              onClick={() => setOpenModal(false)}
              type='button'
            >
              No, cancel
            </button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ConfirmDelete
