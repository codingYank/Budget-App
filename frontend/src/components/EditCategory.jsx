import React from 'react'
import '../styles/modal.css'
import '../styles/form.css'
import { Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { useUpdateCategoryMutation } from '../slices/categoriesApiSlice'

const EditCategory = ({show, category, refetchCat}) => {
  const close = () => {
    show(false)
  }

  const initData = {
    id: category._id,
    name: category.name,
    color: category.color
  }

  const [updateCategory , {isLoading}] = useUpdateCategoryMutation()

  const onSubmit = async (e) => {   
    try {
      await updateCategory(e).unwrap()
      refetchCat()
      close()
    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className='modal-screen'>
      <div className='modal-content'>
        <button type='button' onClick={close} className='invisable-btn'>X</button>
        <h1>Update category</h1>
        <Formik initialValues={initData} onSubmit={onSubmit}>
          <Form className='form'>
            <div className='form-content'>
              <label htmlFor='name'>Name</label>
              <Field name='name' id='name' />
            </div>
            <div className='form-content'>
              <label htmlFor='color'>Category Color</label>
              <Field name='color' id='color' type='color' className='color-input' />
            </div>
            <button className='primary-btn' type='submit' disabled={isLoading}>Update</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default EditCategory