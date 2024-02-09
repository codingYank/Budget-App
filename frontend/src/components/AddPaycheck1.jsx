import { Field, Form, Formik } from "formik"
import React from "react"

const AddPaycheck1 = ({ favoritePaychecks, setFavoritePaycheck, next }) => {
  const onSubmit = (e) => {
    // console.log(e.favorite)
    if (e.favorite) {
      setFavoritePaycheck(favoritePaychecks[e.favorite])
    }
    next()
  }
  // console.log(favoritePaychecks)

  const initValues = {
    favorite: "",
  }
  return (
    <Formik initialValues={initValues} onSubmit={onSubmit}>
      <Form className="form">
        <div className="form-content">
          <label htmlFor="favorite">Use Favorite Paycheck</label>
          <Field name="favorite" id="favorite" as="select">
            <option value={null}></option>
            {favoritePaychecks.map((paycheck, index) => (
              <option value={index} key={paycheck._id}>
                {paycheck.nickname}
              </option>
            ))}
          </Field>
        </div>
        <button className="primary-btn" type="submit">
          Next
        </button>
      </Form>
    </Formik>
  )
}

export default AddPaycheck1
