import { Field, FieldArray, Form, Formik } from "formik"
import React, { useState } from "react"
import {
  useCreatePaycheckMutation,
  useGetFavoritePaychecksQuery,
} from "../slices/transactionsApiSlice"
import { toast } from "react-toastify"
import AddPaycheck1 from "./AddPaycheck1"
import AddPaycheck2 from "./AddPaycheck2"
import Loader from "./Loader"

const AddPaycheck = ({ show, refetchCategories, refetchUser, categories }) => {
  const [step, setStep] = useState(1)
  const [favoritePaycheck, setFavoritePaycheck] = useState({})

  const close = () => {
    show(false)
  }

  const next = () => {
    setStep(step + 1)
  }

  //get favorite paychecks
  const {
    data: favoritePaychecks,
    isLoading,
    error,
  } = useGetFavoritePaychecksQuery()

  return (
    <div className="modal-screen">
      <div className="modal-content">
        <button type="button" onClick={close} className="invisable-btn">
          X
        </button>
        <h1>New Paycheck</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div>Favorite Paychecks Error</div>
        ) : (
          <>
            {step === 1 ? (
              <AddPaycheck1
                favoritePaychecks={favoritePaychecks}
                setFavoritePaycheck={setFavoritePaycheck}
                next={next}
              />
            ) : step === 2 ? (
              <AddPaycheck2
                show={show}
                refetchCategories={refetchCategories}
                refetchUser={refetchUser}
                categories={categories}
                favoritePaycheck={favoritePaycheck}
              />
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}

export default AddPaycheck
