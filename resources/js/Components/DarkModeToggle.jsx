import { useThemeContext } from '@/Context/ThemeContext'

const DarkModeToggle = () => {
  const { colorTheme, setTheme } = useThemeContext()

  return (
    <button onClick={() => setTheme(colorTheme)} type='button' className='text-nord3 hover:text-nord9  focus:outline-none focus:ring-4   rounded-lg text-sm p-2.5'>
      {
            colorTheme === 'light'
              ? <i className='w-5 h-5 fas fa-moon text-slate-50' />
              : <i className='w-5 h-5 fas fa-sun ' />
        }

    </button>

  )
}

export default DarkModeToggle
