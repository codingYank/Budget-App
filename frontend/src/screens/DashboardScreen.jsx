import React from 'react'
import { useGetCategoriesQuery } from '../slices/categoriesApiSlice'
import { useGetRecentTransactionsQuery } from '../slices/transactionsApiSlice'

const DashboardScreen = () => {

  const {data:categories, isLoading: categoriesLoading, error: categoriesError} = useGetCategoriesQuery()

  const {data:recentTransactions, isLoading:recentTransactionsLoading, error:recentTransactionsError}= useGetRecentTransactionsQuery()

  console.log(categories)
  console.log(recentTransactions)
  return (
    <div>DashboardScreen</div>
  )
}

export default DashboardScreen