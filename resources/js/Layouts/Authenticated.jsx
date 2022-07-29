import Sidebar from '@/Components/Sidebar'
import DarkModeToggle from '@/Components/DarkModeToggle'

export default function Authenticated ({ auth, header, children }) {
  return (
    <>
      <Sidebar auth={auth} />
      <div className='relative md:ml-64 min-h-screen bg-gray-100 dark:bg-gray-800'>

        {header && (
          <header className='pr-5 bg-white dark:bg-gray-900  border-b  flex justify-between items-center'>
            <div className='max-w-7xl py-[37.5px] px-4 sm:px-6 lg:px-8 dark:text-white text-gray-800'>{header}</div>
            <DarkModeToggle />
          </header>
        )}

        <main className='px-5 sm:px-0'>{children}</main>
      </div>
    </>
  )
}
