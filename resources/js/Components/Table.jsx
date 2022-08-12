import { Link } from '@inertiajs/inertia-react'
import { isObject } from 'lodash'

const Table = ({ headers, data, buttons }) => {
  const filtered = () => {
    const list = []
    data.forEach((element) => {
      const row = []
      for (const prop in element) {
        prop !== 'created_at' &&
          prop !== 'updated_at' &&
          !isObject(element[prop]) &&
          row.push(element[prop])
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
            {headers.map((col, index) => (
              <th key={index} scope='col' className='py-3 px-6'>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            filtered().map((element, index) => (
              <tr
                key={index}
                className='bg-white border-b dark:bg-slate-800 dark:border-gray-700'
              >
                {element.map((e, index) => (
                  <td key={index} className='py-4 px-6 capitalize'>
                    {e}
                  </td>
                ))}
                <td className='py-4 px-6 flex gap-2'>
                  {buttons &&
                    buttons.map(({ name, icon, className, onClick, label }, index) => (
                      <Link
                        key={index}
                        data-row={element[0]}
                        onClick={onClick}
                        href={`/clients/${element[0]}/${name}`}
                        className={`${className} text-white flex items-center justify-center p-2 uppercase rounded gap-2`}
                      >
                        <i className={icon} />
                        {label}
                      </Link>
                    ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
