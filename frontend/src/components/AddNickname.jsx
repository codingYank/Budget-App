import { Field, Form, Formik } from "formik"
import React from "react"
import { toast } from "react-toastify"

const AddNickname = ({
  show,
  paycheck,
  favoritePaycheck,
  refetchPaychecks,
  refetchFavorites,
}) => {
  const close = () => {
    show(false)
  }

  const onSubmit = async (e) => {
    try {
      await favoritePaycheck({
        id: paycheck._id,
        nickname: e.nickname,
      }).unwrap()
      refetchFavorites()
      refetchPaychecks()
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
        <h1>Set Nickname</h1>
        <Formik initialValues={{ nickname: "" }} onSubmit={onSubmit}>
          <Form className="form">
            <div className="form-content">
              <label htmlFor="nickname">Nickname</label>
              <Field id="nickname" name="nickname" />
            </div>
            <button type="submit" className="primary-btn">
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default AddNickname
