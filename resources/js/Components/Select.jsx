import { useEffect, useRef } from 'react'

export default function Select ({
  name,
  value,
  className,
  autoComplete,
  required,
  isFocused,
  handleChange,
  options
}) {
  const select = useRef()

  useEffect(() => {
    if (isFocused) {
      select.current.focus()
    }
  }, [])

  return (
    <div className='flex flex-col items-start'>
      <select
        name={name}
        value={value}
        className={
                    'border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm dark:bg-transparent dark:text-white dark:bg-gray-800 ' +
                    className
                }
        ref={select}
        autoComplete={autoComplete}
        required={required}
        onChange={(e) => handleChange(e)}
        defaultValue={value}

      >
        <option value='' disabled selected>Choose ...</option>
        {
            options.map(({ value, label, id, title, name: n }, index) => (
              <option key={index} value={value ?? id}>{label ?? title ?? n ?? value}</option>
            ))
        }
      </select>
    </div>
  )
}
