import { createContext, useContext, useState } from 'react'
const SidebarContext = createContext()
function SidebarProvider (props) {
  const [sidebarShow, setSidebarShow] = useState(true)

  const value = {
    sidebarShow,
    setSidebarShow
  }
  return <SidebarContext.Provider value={value} {...props} />
}

const useSidebarContext = () => {
  const context = useContext(SidebarContext)
  return context
}

export { SidebarProvider, useSidebarContext }
