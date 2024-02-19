import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  useGetFavoritePaychecksQuery,
  useGetPaychecksQuery,
} from "../slices/transactionsApiSlice"
import Loader from "../components/Loader"
import PaycheckCard from "../components/PaycheckCard"

const PaychecksScreen = () => {
  const [page, setPage] = useState(1)
  let pageCount = useRef(1)

  const {
    data: paychecks,
    refetch: refetchPaychecks,
    isFetching: paychecksFetching,
    isLoading: paychecksLoading,
    error: paychecksError,
  } = useGetPaychecksQuery({ page })

  const {
    data: favoritePaychecks,
    refetch: refetchFavorites,
    isLoading: favoritePaychecksLoading,
    error: favoritePaychecksError,
  } = useGetFavoritePaychecksQuery()

  const handleScroll = useCallback(
    (e) => {
      const scrollPercent =
        (e.target.offsetHeight + e.target.scrollTop) / e.target.scrollHeight
      if (
        scrollPercent > 0.9 &&
        paychecks.length % 16 === 0 &&
        !paychecksFetching
      ) {
        pageCount.current = paychecks.length / 16 + 1
        setPage(pageCount.current)
        refetchPaychecks()
      }
    },
    [refetchPaychecks, paychecks, paychecksFetching]
  )

  useEffect(() => {
    if (paychecks) {
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [paychecks, handleScroll])

  return (
    <div
      className="scroll"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      onScroll={(e) => handleScroll(e)}
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
