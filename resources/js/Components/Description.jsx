export default function Description ({ title, object }) {
  return (
    <div className='bg-white dark:bg-slate-700 shadow overflow-hidden sm:rounded-lg'>
      <div className='px-4 py-5 sm:px-6'>
        <h3 className='text-lg leading-6 font-medium text-gray-900 dark:text-gray-100'>{title}</h3>
      </div>
      <div className='border-t border-gray-200 '>
        <dl>
          {Object.keys(object).map((key, index) => {
            return (
              <div
                key={index}
                className='bg-gray-50 dark:bg-slate-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 capitalize'
              >
                <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>{key}</dt>
                <dd className='mt-1 text-sm text-gray-900 dark:text-gray-50 sm:mt-0 sm:col-span-2'>
                  {object[key]}
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </div>
  )
}
