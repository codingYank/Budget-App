import React from "react"
import {
  useGetFavoritePaychecksQuery,
  useGetPaychecksQuery,
} from "../slices/transactionsApiSlice"
import Loader from "../components/Loader"
import PaycheckCard from "../components/PaycheckCard"

const PaychecksScreen = () => {
  const {
    data: paychecks,
    refetch: refetchPaychecks,
    isLoading: paychecksLoading,
    error: paychecksError,
  } = useGetPaychecksQuery()
  const {
    data: favoritePaychecks,
    refetch: refetchFavorites,
    isLoading: favoritePaychecksLoading,
    error: favoritePaychecksError,
  } = useGetFavoritePaychecksQuery()

  return (
    <div
      className="scroll"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ textAlign: "center" }}>Paychecks</h1>
      <div style={{ textAlign: "center" }}>
        <h3 style={{ textAlign: "center" }}>Favorites</h3>
        {favoritePaychecksLoading ? (
          <Loader />
        ) : favoritePaychecksError ? (
          <div>Error</div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "15px",
              maxWidth: "900px",
            }}
          >
            {favoritePaychecks.map((paycheck) => (
              <PaycheckCard
                paycheck={paycheck}
                favorite={true}
                refetchPaychecks={refetchPaychecks}
                refetchFavorites={refetchFavorites}
                key={`${paycheck._id}fav`}
              />
            ))}
          </div>
        )}
      </div>
      <div>
        <h3 style={{ textAlign: "center" }}>All Paychecks</h3>
        {paychecksLoading ? (
          <Loader />
        ) : paychecksError ? (
          <div>Error</div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "15px",
              maxWidth: "900px",
            }}
          >
            {paychecks.map((paycheck) => (
              <PaycheckCard
                paycheck={paycheck}
                refetchPaychecks={refetchPaychecks}
                refetchFavorites={refetchFavorites}
                key={paycheck._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PaychecksScreen
