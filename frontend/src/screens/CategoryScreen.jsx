import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetCategoryByIdQuery } from '../slices/categoriesApiSlice'
import Loader from '../components/Loader'
import { useGetCategoryTransactionsQuery } from '../slices/transactionsApiSlice'
import '../styles/button.css'

const CategoryScreen = () => {
  const { id } = useParams()
  
  const {data:category, isLoading:categoryLoading, refetch:refetchCategories, error:categoryError} = useGetCategoryByIdQuery(id)

  const {data:transactions, isLoading:transactionsLoading, refetch: refetchTransactions, error:transactionsError} = useGetCategoryTransactionsQuery(id)

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {categoryLoading ? (<Loader />) : categoryError ? (<div>Category Error</div>) : (
        <div>
          <h1>{category.name}</h1>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <h3>${Number(category.total).toLocaleString('en', {useGrouping:true})}</h3>
            <button type='button' >+</button>
          </div>
        </div> 
      )}
      {transactionsLoading || categoryLoading ? (<Loader />) : transactionsError || categoryError ? (
        <div>Transactions Error</div>
      ) : (
        <div style={{textAlign: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <h1>Transactions</h1>
            <button type='button'>+</button>
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th className='th'>Date</th>
                <th className='th'>Category</th>
                <th className='th'>Name</th>
                <th className='th'>Amount</th>
              </tr>
            </thead>
            {transactions.map(transaction => (
              <tbody key={transaction._id} style={{backgroundColor: `rgba(${category.color},.6)`}} className='table-row'>
                <tr>
                  <td className='td'>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                  <td className='td'>{transaction.category.name}</td>
                  <td className='td'>{transaction.name}</td>
                  <td className='td'>${Number(transaction.value).toLocaleString('en', {useGrouping:true})}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  )
}

export default CategoryScreen