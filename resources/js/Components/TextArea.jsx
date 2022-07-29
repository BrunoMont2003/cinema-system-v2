const TextArea = ({ name, value, handleChange, className }) => {
  return (
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      className={
          'border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm dark:bg-transparent dark:text-white dark:bg-gray-800 ' +
          className
      }
      style={{
        resize: 'none'
      }}
    />
  )
}
export default TextArea
