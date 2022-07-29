import React from 'react'

export default function Label ({ forInput, value, className, children }) {
  return (
    <label htmlFor={forInput} className={'capitalize dark:text-slate-50 block font-medium text-sm text-gray-700 ' + className}>
      {value || children}
    </label>
  )
}
