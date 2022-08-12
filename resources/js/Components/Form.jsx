import { Link, useForm } from '@inertiajs/inertia-react'
import React from 'react'
import Button from './Button'
import Input from './Input'
import Label from './Label'
import Select from './Select'
import TextArea from './TextArea'
import ValidationErrors from './ValidationErrors'

const Form = ({
  routeName,
  inputs,
  initialValues: values,
  extraOnChanges,
  method = 'post',
  goBackRoute
}) => {
  const { data, setData, post, put, processing, errors } = useForm({
    ...values
  })
  const onHandleChange = (event) => {
    if (extraOnChanges) {
      extraOnChanges.forEach((ex) => {
        if (event.target.name === ex.input) {
          ex.onChange(event)
        }
      })
    }
    setData(
      event.target.name,
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    )
  }
  const submit = (e) => {
    e.preventDefault()
    if (method === 'post') {
      post(route(routeName))
      return
    }
    if (method === 'put') {
      console.log(data)
      put(route(routeName, data.id), data)
    }
  }
  return (
    <>
      <ValidationErrors errors={errors} />

      <form onSubmit={submit} className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
        {inputs.map(
          ({ name, label, type, options, placeholder, required }, key) => (
            <div key={key}>
              <Label forInput={name} value={label} />
              {type === 'textarea' && (
                <TextArea
                  type={type}
                  id={name}
                  placeholder={placeholder}
                  name={name}
                  value={data[name]}
                  className='mt-1 block w-full '
                  handleChange={onHandleChange}
                />
              )}
              {type === 'select' && (
                <Select
                  id={name}
                  options={options}
                  name={name}
                  value={data[name]}
                  className='mt-1 block w-full '
                  handleChange={onHandleChange}
                />
              )}
              {type !== 'select' && type !== 'textarea' && (
                <Input
                  required={required}
                  type={type}
                  id={name}
                  placeholder={placeholder}
                  name={name}
                  value={data[name]}
                  className='mt-1 block w-full '
                  handleChange={onHandleChange}
                />
              )}
            </div>
          )
        )}

        <div className='flex items-center gap-5 lg:col-span-2'>
          <Button processing={processing}>
            {method === 'post' ? 'Create' : 'Update'}
          </Button>
          <Link
            className='px-4 py-2 bg-blue-600 font-semibold text-xs text-white uppercase tracking-widest rounded-md'
            href={goBackRoute}
          >
            GO BACK
          </Link>
        </div>
      </form>
    </>
  )
}

export default Form
