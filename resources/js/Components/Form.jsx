import { useForm } from '@inertiajs/inertia-react'
import React from 'react'
import Button from './Button'
import Input from './Input'
import Label from './Label'
import Select from './Select'
import ValidationErrors from './ValidationErrors'

const Form = ({ routeName, inputs, initialValues: values }) => {
  const { data, setData, post, processing, errors } = useForm({
    ...values
  })
  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)
  }
  const submit = (e) => {
    e.preventDefault()

    post(route(routeName))
  }
  return (
    <>
      <ValidationErrors errors={errors} />

      <form onSubmit={submit} className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
        {
          inputs.map(({ name, title, type, options, placeholder }, key) => (
            <div key={key}>
              <Label forInput={name} value={title} />
              {
              type !== 'select'
                ? <Input
                    type={type}
                    id={name}
                    placeholder={placeholder}
                    name={name}
                    value={data[name]}
                    className='mt-1 block w-full '
                    handleChange={onHandleChange}
                  />
                : <Select
                    id={name}
                    options={options} name={name}
                    value={data[name]}
                    className='mt-1 block w-full '
                    handleChange={onHandleChange}
                  />
            }
            </div>

          ))
        }

        <Button className='mt-4 w-16 lg:col-span-2' processing={processing}>
          Add
        </Button>

      </form>
    </>
  )
}

export default Form
