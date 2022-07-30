import { useForm } from '@inertiajs/inertia-react'
import React from 'react'
import Button from './Button'
import Input from './Input'
import Label from './Label'
import Select from './Select'
import TextArea from './TextArea'
import ValidationErrors from './ValidationErrors'

const Form = ({ routeName, inputs, initialValues: values, extraOnChanges }) => {
  const { data, setData, post, processing, errors } = useForm({
    ...values
  })
  const onHandleChange = (event) => {
    if (extraOnChanges) {
      extraOnChanges.forEach(ex => {
        if (event.target.name === ex.input) {
          ex.onChange(event)
        }
      })
    }
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
          inputs.map(({ name, label, type, options, placeholder, required }, key) => (
            <div key={key}>
              <Label forInput={name} value={label} />
              {
                type === 'textarea' && (
                  <TextArea
                    type={type}
                    id={name}
                    placeholder={placeholder}
                    name={name}
                    value={data[name]}
                    className='mt-1 block w-full '
                    handleChange={onHandleChange}
                  />
                )
}
              {
                  type === 'select' && (<Select
                    id={name}
                    options={options} name={name}
                    value={data[name]}
                    className='mt-1 block w-full '
                    handleChange={onHandleChange}
                                        />)
                }
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
                />)}
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
