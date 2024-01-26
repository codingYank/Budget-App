import React from 'react'
import '../styles/modal.css'
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
        <button type='button' onClick={close}>X</button>
        <h1>New category</h1>
        <Formik initialValues={initData} onSubmit={onSubmit}>
          <Form>
            <label htmlFor='name'>Name</label>
            <Field name='name' id='name' />
            <label htmlFor='total'>Category Funds</label>
            <Field name='total' id='total' />
            <label htmlFor='color'>Category Color</label>
            <Field name='color' id='color' type='color' />
            <button type='submit' disabled={isLoading}>Create</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default AddCategory