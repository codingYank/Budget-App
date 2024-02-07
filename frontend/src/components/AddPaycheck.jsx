import { Field, FieldArray, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useCreatePaycheckMutation } from '../slices/transactionsApiSlice'
import { toast } from 'react-toastify'
import AddPaycheck1 from './AddPaycheck1'
import AddPaycheck2 from './AddPaycheck2'

const AddPaycheck = ({ show, refetchCategories, refetchUser, categories }) => {
  const [step, setStep] = useState(2)
  const [favoritePaycheck, setFavoritePaycheck] = useState({})

  const close = () => {
    show(false)
  }

  //get favorite paychecks

  return (
    <div className='modal-screen'>
      <div className='modal-content'>
        <button type='button' onClick={close} className='invisable-btn'>X</button>
        <h1>New Paycheck</h1>
        {step === 1 ? (
          <AddPaycheck1 refetchCategories={refetchCategories} refetchUser={refetchUser} categories={categories}  />
        ) : step === 2 ? (
          <AddPaycheck2 show={show} refetchCategories={refetchCategories} refetchUser={refetchUser} categories={categories}  />
        ) : (null)}
      </div>
    </div>
  )
}

export default AddPaycheck