import { createContext, useContext, useState } from 'react'
const ModalContext = createContext()
function ModalProvider (props) {
  const [openModal, setOpenModal] = useState(false)
  const [modalValues, setModalValues] = useState(
    { title: '', key: '' }
  )

  const value = {
    openModal,
    setOpenModal,
    modalValues,
    setModalValues
  }
  return <ModalContext.Provider value={value} {...props} />
}

const useModalContext = () => {
  const context = useContext(ModalContext)
  return context
}

export { ModalProvider, useModalContext }
