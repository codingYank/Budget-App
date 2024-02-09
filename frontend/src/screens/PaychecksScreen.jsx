import React from "react"
import { useGetFavoritePaychecksQuery, useGetPaychecksQuery } from "../slices/transactionsApiSlice"
import Loader from "../components/Loader"

const PaychecksScreen = () => {

  const {data:paychecks, isLoading:paychecksLoading, error:PaychecksError} = useGetPaychecksQuery()
  const {data:favoritePaychecks, isLoading:favoritePaychecksLoading, error:favoritePaychecksError} = useGetFavoritePaychecksQuery()

  console.log(paychecks)
  console.log(favoritePaychecks)
  return (
    <div className="scroll">
      <h1 style={{textAlign: 'center'}}>Paychecks</h1>
      <div>
        <h3 style={{textAlign: 'center'}}>Favorites</h3>
        {favoritePaychecksLoading ? (<Loader/>) : favoritePaychecksError ? (<div>Error</div>) : (
          <div>
            {favoritePaychecks.map(paycheck => (
              <div key={paycheck._id}>
                <div>
                  <h3>{paycheck.nickname}</h3>
                  <h4>${paycheck.value}</h4>
                </div>
                {paycheck.categories.map(category => (
                  <div key={category.category._id}>
                    <h6>{category.category.name}: </h6>
                    <p>${category.depositAmount}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PaychecksScreen
