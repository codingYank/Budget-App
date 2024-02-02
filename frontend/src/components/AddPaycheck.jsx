import { Field, FieldArray, Form, Formik } from 'formik'
import React, { useState } from 'react'

const AddPaycheck = ({ show, refetchCategories, refetchUser, categories }) => {
  const [uncategorized, setUncategorized] = useState(0)
  const close = () => {
    show(false)
  }

  const categoryIds = categories.map(category => (
    {
      id: category._id,
      name: category.name,
      depositAmount: 0,
    }
  ))

  const initValues = {
    name: '',
    value: 0,
    categories: categoryIds
  }

  const onSubmit = (e) => {
    console.log(e)
  }

  const onChange = (e) => {
    let array = []
    for (let i = 0; i <= categoryIds.length + 1; i++) {
      array.push(e.target.form[i].value)
    }
    let paycheck = Number(array[1])
    let sum = 0
    for (let i = 2; i < array.length; i++) {
      sum += Number(array[i])
    }
    setUncategorized(paycheck - sum)
  }

  return (
    <div className='modal-screen'>
      <div className='modal-content'>
        <button type='button' onClick={close} className='invisable-btn'>X</button>
        <h1>New Paycheck</h1>
        <p>{uncategorized}</p>
        <Formik initialValues={initValues} onSubmit={onSubmit}>
          <Form onChange={onChange}>
            <div className='form-content'>
              <label htmlFor='name'>Name</label>
              <Field name='name' id='name' />
            </div>
            <div className='form-content'>
              <label htmlFor='value'>Paycheck Total</label>
              <Field name='value' id='value' type='number'/>
            </div>
            <FieldArray name='categories'>
              {() => (
                <>
                {initValues.categories.length > 0 && 
                  initValues.categories.map((category, index) => (
                    <div className='form-content' key={category.id}>
                      <label htmlFor={category.id}>{category.name}</label>
                      <Field name={`categories.${index}.depositAmount`} id={category.id} type='number' />
                    </div>
                  ))}
                </>
              )}
            </FieldArray>
            <button className='primary-btn' type='submit' >Create</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default AddPaycheck