import React from 'react'
import '../styles/modal.css'
import '../styles/form.css'
import { Field, Form, Formik } from 'formik'
import { useCreateCategoryMutation } from '../slices/categoriesApiSlice'
import { toast } from 'react-toastify'

const AddCategory = ({show, refetchCategories, refetchUser}) => {
  const close = () => {
    show(false)
  }

  const initData = {
    name: '',
    total: '',
    color: '#ffffff'
  }

  const [createCategory , {isLoading}] = useCreateCategoryMutation()

  const onSubmit = async (e) => {
    console.log(e)
    const color = e.color
    const r = parseInt(color.substr(1,2), 16)
    const g = parseInt(color.substr(3,2), 16)
    const b = parseInt(color.substr(5,2), 16)
    const rgb = `${r},${g},${b}`
    
    try {
      const res = await createCategory({name: e.name, total: e.total, color: rgb}).unwrap()
      close()
      refetchCategories()
      refetchUser()
    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className='modal-screen'>
      <div className='modal-content'>
        <button type='button' onClick={close} className='invisable-btn'>X</button>
        <h1>New category</h1>
        <Formik initialValues={initData} onSubmit={onSubmit}>
          <Form className='form'>
            <div className='form-content'>
              <label htmlFor='name'>Name</label>
              <Field name='name' id='name' />
            </div>
            <div className='form-content'>
              <label htmlFor='total'>Category Funds</label>
              <Field name='total' id='total' />
            </div>
            <div className='form-content'>
              <label htmlFor='color'>Category Color</label>
              <Field name='color' id='color' type='color' className='color-input' />
            </div>
            <button className='primary-btn' type='submit' disabled={isLoading}>Create</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default AddCategory