import React from 'react'
import { useGetCategoriesQuery } from '../slices/categoriesApiSlice'
import { useGetRecentTransactionsQuery } from '../slices/transactionsApiSlice'
import { useGetUserQuery } from '../slices/usersApiSlice'
import Loader from '../components/Loader'
import CategoryCard from '../components/CategoryCard'
import '../styles/table.css'

const DashboardScreen = () => {

  const {data:categories, isLoading: categoriesLoading, error: categoriesError} = useGetCategoriesQuery()

  const {data:recentTransactions, isLoading:recentTransactionsLoading, error:recentTransactionsError}= useGetRecentTransactionsQuery()

  const {data:user, isLoading:userLoading, error: userError} = useGetUserQuery()

  const printColor = (e) => {
    const color = e.target.value
    const r = parseInt(color.substr(1,2), 16)
    const g = parseInt(color.substr(3,2), 16)
    const b = parseInt(color.substr(5,2), 16)
    console.log(`red: ${r}, green: ${g}, blue: ${b}`)
  }

  console.log(categories)
  console.log(recentTransactions)
  console.log(user)
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <input type='color' onChange={(e) => printColor(e)}></input>
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
        <div style={{textAlign: 'center'}}>
          <h1>Recent Transactions</h1>
          <table className='table'>
            <thead>
              <tr>
                <th className='th'>Date</th>
                <th className='th'>Category</th>
                <th className='th'>Name</th>
                <th className='th'>Amount</th>
              </tr>
            </thead>
            {recentTransactions.map(transaction => (
              <tbody key={transaction._id} style={{backgroundColor: `rgba(${transaction.category.color},.3)`}} className='table-row'>
                <tr>
                  <td className='th'>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                  <td className='th'>{transaction.category.name}</td>
                  <td className='th'>{transaction.name}</td>
                  <td className='th'>${transaction.value}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  )
}

export default DashboardScreen