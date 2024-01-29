import React, { useState } from 'react'
import { useAsyncError, useParams } from 'react-router-dom'
import { useGetCategoryByIdQuery } from '../slices/categoriesApiSlice'
import Loader from '../components/Loader'
import { useGetCategoryTransactionsQuery } from '../slices/transactionsApiSlice'
import '../styles/button.css'
import AddTransaction from '../components/AddTransaction'

const CategoryScreen = () => {
  const { id } = useParams()

  const [showAddTransaction, setShowAddTransaction] = useState(false)

  const onAddTransaction = () => {
    setShowAddTransaction(true)
  }

  const [showCategoryIncrease, setShowCategoryIncrease] = useState(false)
  
  const {data:category, isLoading:categoryLoading, refetch:refetchCategories, error:categoryError} = useGetCategoryByIdQuery(id)

  const {data:transactions, isLoading:transactionsLoading, refetch: refetchTransactions, error:transactionsError} = useGetCategoryTransactionsQuery(id)


  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {showAddTransaction ? (
        <AddTransaction show={setShowAddTransaction} refetchTrans={refetchTransactions} refetchCat={refetchCategories} category={id} />
      ) : null }
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
            <button type='button' onClick={onAddTransaction}>+</button>
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
            {transactions.map((transaction, index ) => (
              <tbody key={transaction._id}  style={index % 2 === 0 ? ({backgroundColor: `rgba(${category.color},.6)`}) : ({backgroundColor: `rgba(${category.color},.4)`})} className='table-row'>
                <tr>
                  <td className='td'>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                  <td className='td'>{transaction.category.name}</td>
                  <td className='td'>{transaction.name}</td>
                  <td className='td'>${Number(transaction.value).toLocaleString('en', {useGrouping:true})}</td>
                </tr>
              </tbody>
            ))}
          </table>
          <h1>*Fix Table Order!!!!!!!!!!!!!!!!!!!!!!!!*</h1>
        </div>
      )}
    </div>
  )
}

export default CategoryScreen