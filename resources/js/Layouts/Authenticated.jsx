import { useEffect } from 'react'
import Sidebar from '@/Components/Sidebar'
import DarkModeToggle from '@/Components/DarkModeToggle'
import { toast, ToastContainer } from 'react-toastify'
import { usePage } from '@inertiajs/inertia-react'
import 'react-toastify/dist/ReactToastify.css'
import { useModalContext } from '@/Context/ModalContext'
import { useThemeContext } from '@/Context/ThemeContext'
import { useSidebarContext } from '@/Context/SidebarContext'

export default function Authenticated ({ auth, header, children }) {
  const { flash } = usePage().props
  const { openModal } = useModalContext()
  const { colorTheme } = useThemeContext()
  const { sidebarShow } = useSidebarContext()
  useEffect(() => {
    handleResponse()
  }, [openModal])
  const handleResponse = () => {
    if (flash && flash.alert) {
      // delete flash.alert after 5 seconds
      setTimeout(() => delete flash.alert, 5000)
      if (flash.alert.type === 'success') {
        return toast.success(flash.alert.message)
      }
      if (flash.alert.type === 'warning') return toast.warn(flash.alert.message)
      if (flash.alert.type === 'error') return toast.error(flash.alert.message)
    }
  }
  return (
    <>
      <ToastContainer theme={colorTheme === 'dark' ? 'light' : 'dark'} />

      <Sidebar auth={auth} />
      <div
        className={`relative ${
          sidebarShow ? 'md:ml-64' : 'md:ml-8'
        } min-h-screen bg-gray-100 dark:bg-gray-800`}
      >
        {header && (
          <header className='pr-5 bg-white dark:bg-gray-900  border-b  flex justify-between items-center'>
            <div className='max-w-7xl py-[37.5px] px-4 sm:px-6 lg:px-8 dark:text-white text-gray-800'>
              {header}
            </div>
            <DarkModeToggle />
          </header>
        )}

        <main className='px-5 sm:px-0'>{children}</main>
      </div>
    </>
  )
}
