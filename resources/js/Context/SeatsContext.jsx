import { createContext, useContext, useState } from 'react'
const SeatsContext = createContext()
function SeatsProvider (props) {
  const [seatsSelected, setSeatsSelected] = useState([])
  const [selected, setSelected] = useState(false)
  const value = {
    seatsSelected,
    setSeatsSelected,
    selected,
    setSelected
  }
  return <SeatsContext.Provider value={value} {...props} />
}

const useSeatsContext = () => {
  const context = useContext(SeatsContext)
  return context
}

export { SeatsProvider, useSeatsContext }
