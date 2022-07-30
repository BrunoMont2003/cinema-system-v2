import { useEffect, useState } from 'react'

export default function useDarkMode () {
  const previousTheme = window.localStorage.getItem('theme')
  const [theme, setTheme] = useState(previousTheme || 'light')
  const colorTheme = theme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove(colorTheme)
    root.classList.add(theme)
    window.localStorage.setItem('theme', theme)
  }, [theme, colorTheme])
  return [colorTheme, setTheme]
}
