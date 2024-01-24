import React from 'react'
import { useGetCategoriesQuery } from '../slices/categoriesApiSlice'
import { useGetRecentTransactionsQuery } from '../slices/transactionsApiSlice'
import { useGetUserQuery } from '../slices/usersApiSlice'
import Loader from '../components/Loader'
import CategoryCard from '../components/CategoryCard'

const DashboardScreen = () => {

  const {data:categories, isLoading: categoriesLoading, error: categoriesError} = useGetCategoriesQuery()

  const {data:recentTransactions, isLoading:recentTransactionsLoading, error:recentTransactionsError}= useGetRecentTransactionsQuery()

  const {data:user, isLoading:userLoading, error: userError} = useGetUserQuery()

  console.log(categories)
  console.log(recentTransactions)
  console.log(user)
  return (
    <div>
      {userLoading ? (<Loader />) : userError ? (
        <div>User Error</div>
      ) : (
        <div>
          <div>
            <h1>Total</h1>
            <h3>${user.totalAvailable}</h3>
          </div>
          <div>
            <h2>Uncategorized</h2>
            <h4>${user.uncategorized}</h4>
          </div>
        </div>
      )}
      {categoriesLoading ? (<Loader />) : categoriesError ? (
        <div>Category Error</div>
      ) : (
        categories.map(category => (
          <CategoryCard category={category} />
        ))
      )}
      {recentTransactionsLoading ? (<Loader />) : recentTransactionsError ? (
        <div>Recent Transactions Error</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            {recentTransactions.map(transaction => (
              <tbody key={transaction._id}>
                <tr>
                  <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                  <td>{transaction.category.name}</td>
                  <td>{transaction.name}</td>
                  <td>${transaction.value}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </>
      )}
    </div>
  )
}

export default DashboardScreen