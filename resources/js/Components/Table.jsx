import { Link } from '@inertiajs/inertia-react'
import React from 'react'

const Table = ({ headers, data, buttons }) => {
  const filtered = () => {
    const list = []
    data.forEach(element => {
      const row = []
      for (const prop in element) {
        prop !== 'created_at' && prop !== 'updated_at' && (row.push(element[prop]))
      }
      list.push(row)
    })
    return list
  }

  return (

    <div className='overflow-x-auto relative'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            {
              headers.map((col, index) => (
                <th key={index} scope='col' className='py-3 px-6'>
                  {col}
                </th>

              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            data && filtered().map((element, index) => (
              <tr key={index} className='bg-white border-b dark:bg-slate-800 dark:border-gray-700'>
                {
                  element.map((e, index) => (
                    <td key={index} className='py-4 px-6 capitalize'>
                      {e}
                    </td>
                  ))
                }
                {
            buttons && buttons.map(({ name, baseLink }, index) => (
              <td className='py-4 px-6' key={index}>

                <Link href={baseLink + element[0]} className='text-sm py-2 px-2 rounded-sm bg-red-600 dark:bg-red-800 text-white'>{name}</Link>
              </td>
            ))
          }
              </tr>

            ))
          }

        </tbody>
      </table>
    </div>

  )
}

export default Table
