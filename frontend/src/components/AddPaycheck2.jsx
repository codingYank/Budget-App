import { Field, FieldArray, Form, Formik } from "formik"
import React, { useState } from "react"
import { useCreatePaycheckMutation } from "../slices/transactionsApiSlice"
import { toast } from "react-toastify"

const AddPaycheck2 = ({
  show,
  refetchCategories,
  refetchUser,
  categories,
  favoritePaycheck,
}) => {
  const [uncategorized, setUncategorized] = useState(0)
  const [favorite, setFavorite] = useState(false)

  const close = () => {
    show(false)
  }

  const [createPaycheck, { isLoading }] = useCreatePaycheckMutation()

  let categoryIds

  if (favoritePaycheck.categories) {
    categoryIds = favoritePaycheck.categories.map((category) => ({
      category: category.category._id,
      name: category.category.name,
      depositAmount: category.depositAmount,
    }))
    categories.map((category, index) => {
      if (categoryIds[index]?.category === category.category) {
        categoryIds.push({
          category: category._id,
          name: category.name,
          depositAmount: 0,
        })
      }
    })
  } else {
    categoryIds = categories.map((category) => ({
      category: category._id,
      name: category.name,
      depositAmount: 0,
    }))
  }

  const initValues = {
    name: "",
    value: favoritePaycheck?.value || 0,
    nickname: "",
    favorite: false,
    categories: categoryIds,
  }

  const onSubmit = async (e) => {
    console.log(e)
    try {
      await createPaycheck(e).unwrap()
      refetchCategories()
      refetchUser()
      close()
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const onChange = (e) => {
    let array = []
    for (let i = 0; i <= categoryIds.length + 1; i++) {
      array.push(e.target.form[i].value)
    }
    let paycheck = Number(array[1])
    let sum = 0
    for (let i = 2; i < array.length; i++) {
      sum += Number(array[i])
    }
    setUncategorized(paycheck - sum)
  }

  return (
    <>
      <Formik initialValues={initValues} onSubmit={onSubmit}>
        <Form className="form" onChange={onChange}>
          <div className="form-content">
            <label htmlFor="name">Name</label>
            <Field name="name" id="name" />
          </div>
          <div className="form-content">
            <label htmlFor="value">Paycheck Total</label>
            <Field name="value" id="value" type="number" />
          </div>
          <FieldArray name="categories">
            {() => (
              <>
                {initValues.categories.length > 0 &&
                  initValues.categories.map((category, index) => (
                    <div className="form-content" key={category.category}>
                      <label htmlFor={category.category}>{category.name}</label>
                      <Field
                        name={`categories.${index}.depositAmount`}
                        id={category.category}
                        type="number"
                      />
                    </div>
                  ))}
              </>
            )}
          </FieldArray>
          <p>Savings: ${uncategorized}</p>
          <div>
            <label htmlFor="favorite">Favorite Paycheck</label>
            <Field
              name="favorite"
              type="checkbox"
              id="favorite"
              onClick={() => setFavorite(!favorite)}
            />
          </div>
          {favorite ? (
            <div className="form-content">
              <label htmlFor="nickname">Paycheck Nickname</label>
              <Field name="nickname" id="nickname" />
            </div>
          ) : null}
          <button className="primary-btn" type="submit" disabled={isLoading}>
            Create
          </button>
        </Form>
      </Formik>
    </>
  )
}

export default AddPaycheck2
