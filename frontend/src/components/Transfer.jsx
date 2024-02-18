import { Field, Form, Formik } from "formik"
import React from "react"
import { useGetCategoriesQuery } from "../slices/categoriesApiSlice"
import Loader from "./Loader"
import { useCreateTransferMutation } from "../slices/transactionsApiSlice"
import { toast } from "react-toastify"

const Transfer = ({ show, refetchTrans, refetchCat, category }) => {
  const close = () => {
    show(false)
  }

  const [createTransfer, {isLoading}] = useCreateTransferMutation()

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery()

  const initData = {
    from: "",
    to: category,
    amount: 0,
  }

  const onSubmit = async (e) => {
    try {
      await createTransfer(e).unwrap()
      refetchCat()
      refetchTrans()
      close()
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="modal-screen">
      <div className="modal-content">
        <button type="button" onClick={close} className="invisable-btn">
          X
        </button>
        <h1>Transfer</h1>
        {categoriesLoading ? (
          <Loader /> ? (
            categoriesError
          ) : (
            <div>Error</div>
          )
        ) : (
          <Formik initialValues={initData} onSubmit={onSubmit}>
            <Form className="form">
              <div className="form-content">
                <label htmlFor="from">From</label>
                <Field name='from' id='from' as='select'>
                  <option value={null}></option>
                  {categories.map(category => (
                    <option value={category._id} key={category._id}>{category.name} (${category.total})</option>
                  ))}
                </Field>
              </div>
              <div className="form-content">
                <label htmlFor="amount">Amount</label>
                <Field name='amount' id='amount' type='number' />
              </div>
              <button className="primary-btn" type="submit">Submit</button>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  )
}

export default Transfer
