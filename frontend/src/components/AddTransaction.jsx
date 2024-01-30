import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useCreateTransactionMutation } from '../slices/transactionsApiSlice'
import { toast } from 'react-toastify'

const AddTransaction = ({show, refetchTrans, refetchCat, refetchUser, category}) => {
  const close = () => {
    show(false)
  }

  const [createTransaction, {isLoading}] = useCreateTransactionMutation()
  console.log(category)

  const onSubmit = async (e) => {
    try {
      await createTransaction({
        name: e.name,
        value: Number(e.value) * -1,
        date: e.date,
        category
      }).unwrap()
      refetchCat()
      refetchTrans()
      if (refetchUser) {
        refetchUser()
      }
      close()
    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || err.error)
    }
  }

  const initData = {
    name: '',
    value: 0,
    date: new Date().toISOString().split('T')[0]
  }
  console.log(new Date().toLocaleDateString())
  return (
    <div className='modal-screen'>
      <div className='modal-content'>
        <button type='button' onClick={close}>X</button>
        <h1>Add Transaction</h1>
        <Formik initialValues={initData} onSubmit={onSubmit}>
          <Form>
            <label htmlFor='name'>Name</label>
            <Field id='name' name='name' />
            <label htmlFor="value">Amount</label>
            <Field id='value' name='value' type='number' />
            <label htmlFor='date'>Date</label>
            <Field id='date' name='date' type='date' />
            <button type='submit'>Add</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default AddTransaction