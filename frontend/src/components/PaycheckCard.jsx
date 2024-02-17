import React, { useState } from "react"
import { GoStar, GoStarFill } from "react-icons/go"
import {
  useFavoritePaycheckMutation,
  useUnFavoritePaycheckMutation,
} from "../slices/transactionsApiSlice"
import { toast } from "react-toastify"
import AddNickname from "./AddNickname"

const PaycheckCard = ({
  paycheck,
  favorite,
  refetchPaychecks,
  refetchFavorites,
}) => {
  const [showNickname, setShowNickname] = useState(false)

  const [unfavoritePaycheck, { isLoading: unfavoriteLoading }] =
    useUnFavoritePaycheckMutation()

  const [favoritePaycheck, { isLoading: favoriteLoading }] =
    useFavoritePaycheckMutation()

  const onUnFavorite = async (e, id) => {
    e.preventDefault()
    try {
      await unfavoritePaycheck({ id }).unwrap()
      refetchFavorites()
      refetchPaychecks()
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
    console.log("unfavorite", id)
  }

  const onFavorite = (e) => {
    e.preventDefault()
    setShowNickname(true)
  }
  return (
    <div className="card" style={{ cursor: "default" }}>
      {showNickname ? (
        <AddNickname
          show={setShowNickname}
          paycheck={paycheck}
          favoritePaycheck={favoritePaycheck}
          refetchFavorites={refetchFavorites}
          refetchPaychecks={refetchPaychecks}
        />
      ) : null}
      {paycheck.favorite ? (
        <button
          className="invisable-btn"
          type="button"
          onClick={(e) => onUnFavorite(e, paycheck._id)}
        >
          <GoStarFill />
        </button>
      ) : (
        <button
          className="invisable-btn"
          type="button"
          onClick={(e) => onFavorite(e)}
        >
          <GoStar />
        </button>
      )}
      <div>
        {paycheck.favorite && paycheck.nickname && favorite ? (
          <h3>{paycheck.nickname}</h3>
        ) : (
          <h3>{paycheck.name}</h3>
        )}
        <h4>${paycheck.value}</h4>
      </div>
      {paycheck.categories.map((category) => (
        <div
          key={category.category._id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            marginBottom: "10px",
          }}
        >
          <h6 style={{ margin: 0 }}>{category.category.name}: </h6>
          <p style={{ margin: 0 }}>${category.depositAmount}</p>
        </div>
      ))}
    </div>
  )
}

export default PaycheckCard
