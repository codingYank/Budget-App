import { Form, Formik } from 'formik'
import React from 'react'

const AddPaycheck = ({ show, refetchCategories, refetchUser, categories }) => {
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
    categoryIds
  }

  const onSubmit = (e) => {
    console.log(e)
  }

  console.log(initValues)
  return (
    <div className='modal-screen'>
      <div className='modal-content'>
        <button type='button' onClick={close} className='invisable-btn'>X</button>
        <h1>New Paycheck</h1>
        <Formik>
          <Form>
            <div className='form-content'>
              
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default AddPaycheck