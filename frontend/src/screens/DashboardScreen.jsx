import React, { useState } from 'react'
import { useGetCategoriesQuery } from '../slices/categoriesApiSlice'
import { useGetRecentTransactionsQuery } from '../slices/transactionsApiSlice'
import { useGetUserQuery } from '../slices/usersApiSlice'
import Loader from '../components/Loader'
import CategoryCard from '../components/CategoryCard'
import '../styles/table.css'
import AddCategory from '../components/AddCategory'

const DashboardScreen = () => {
  const [showAddCategory, setShowAddCategory] = useState(false)

  const addCategory = () => {
    setShowAddCategory(true)
  }

  const {data:categories, refetch:refetchCategories, isLoading: categoriesLoading, error: categoriesError} = useGetCategoriesQuery()

  const {data:recentTransactions, isLoading:recentTransactionsLoading, error:recentTransactionsError}= useGetRecentTransactionsQuery()

  const {data:user, refetch:refetchUser, isLoading:userLoading, error: userError} = useGetUserQuery()

  const printColor = (e) => {
    const color = e.target.value
    const r = parseInt(color.substr(1,2), 16)
    const g = parseInt(color.substr(3,2), 16)
    const b = parseInt(color.substr(5,2), 16)
    console.log(`red: ${r}, green: ${g}, blue: ${b}`)
  }


  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {showAddCategory ? (
        <AddCategory show={setShowAddCategory} refetchCategories={refetchCategories} refetchUser={refetchUser} />
      ) : null}
      {/* <input type='color' onChange={(e) => printColor(e)}></input> */}
      {userLoading ? (<Loader />) : userError ? (
        <div>User Error</div>
      ) : (
        <div>
          <div>
            <h1>Total</h1>
            <h3>${Number(user.totalAvailable).toLocaleString('en', {useGrouping:true})}</h3>
          </div>
          <div>
            <h2>Uncategorized</h2>
            <h4>${Number(user.uncategorized).toLocaleString('en', {useGrouping:true})}</h4>
          </div>
        </div>
      )}
      {categoriesLoading ? (<Loader />) : categoriesError ? (
        <div>Category Error</div>
      ) : (
        <div style={{textAlign: 'center'}}>
          <div style={{display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center'}}>
            <h1>Categories</h1>
            <button type='button' onClick={addCategory}>New +</button>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', maxWidth: '700px'}}>
            {categories.map(category => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        </div>
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
                  <td className='th'>${Number(transaction.value).toLocaleString('en', {useGrouping:true})}</td>
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