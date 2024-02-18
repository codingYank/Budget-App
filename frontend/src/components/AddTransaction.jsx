import { Field, Form, Formik } from "formik"
import React from "react"
import { useCreateTransactionMutation } from "../slices/transactionsApiSlice"
import { toast } from "react-toastify"

const AddTransaction = ({
  show,
  refetchTrans,
  refetchCat,
  refetchUser,
  category,
  addToCat,
}) => {
  const close = () => {
    show(false)
  }

  const [createTransaction, { isLoading }] = useCreateTransactionMutation()

  const onSubmit = async (e) => {
    if (addToCat) {
      try {
        await createTransaction({
          name: e.name,
          value: Number(e.value),
          date: e.date,
          category,
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
    } else {
      try {
        await createTransaction({
          name: e.name,
          value: Number(e.value) * -1,
          date: e.date,
          category,
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
  }

  const initData = {
    name: "",
    value: 0,
    date: new Date().toISOString().split("T")[0],
  }
  return (
    <div className="modal-screen">
      <div className="modal-content">
        <button type="button" onClick={close} className="invisable-btn">
          X
        </button>
        {addToCat ? (<h1>Add to Category</h1>) : (<h1>Add Transaction</h1>)}
        <Formik initialValues={initData} onSubmit={onSubmit}>
          <Form className="form">
            <div className="form-content">
              <label htmlFor="name">Name</label>
              <Field id="name" name="name" />
            </div>
            <div className="form-content">
              <label htmlFor="value">Amount</label>
              <Field id="value" name="value" type="number" />
            </div>
            <div className="form-content">
              <label htmlFor="date">Date</label>
              <Field id="date" name="date" type="date" />
            </div>
            <button className="primary-btn" type="submit" disabled={isLoading}>
              Add
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default AddTransaction
