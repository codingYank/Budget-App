import React, { useState, useEffect } from 'react'
import { useAsyncError, useParams } from 'react-router-dom'
import { useGetCategoryByIdQuery } from '../slices/categoriesApiSlice'
import Loader from '../components/Loader'
import { useGetCategoryTransactionsQuery } from '../slices/transactionsApiSlice'
import '../styles/button.css'
import AddTransaction from '../components/AddTransaction'
import { FiEdit2, FiPlus } from "react-icons/fi";

const CategoryScreen = () => {
  const { id } = useParams()

  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [showAddTransactionToCat, setShowAddTransactionToCat] = useState(false)
  const [page, setPage] = useState(1)
  let pageCount = 1
  
  const onAddTransaction = () => {
    setShowAddTransaction(true)
  }
  
  const onAddTransactionToCat = () => {
    setShowAddTransactionToCat(true)
  }
  
  const [showCategoryIncrease, setShowCategoryIncrease] = useState(false)
  
  const {data:category, isLoading:categoryLoading, refetch:refetchCategories, error:categoryError} = useGetCategoryByIdQuery(id)
  
  const {data:transactions, currentData:currentTransactions, isLoading:transactionsLoading, refetch: refetchTransactions, isFetching:transactionsFetching ,error:transactionsError} = useGetCategoryTransactionsQuery({id, page})

  const handleScroll = () => {
    console.log(transactionsFetching)
    const scrollPercent = (window.innerHeight + window.scrollY) / document.body.scrollHeight
    if (scrollPercent > .9 && transactions.length % 30 === 0 && !transactionsFetching ) {
      console.log('fetching')
      pageCount = (transactions.length / 30) + 1
      setPage(pageCount)
      refetchTransactions()
    }
  };

  useEffect(() => {
    if (transactions) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
    }
}, [transactions]);


  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {showAddTransaction ? (
        <AddTransaction show={setShowAddTransaction} refetchTrans={refetchTransactions} refetchCat={refetchCategories} category={id} />
      ) : null }
      {showAddTransactionToCat ? (
        <AddTransaction show={setShowAddTransactionToCat} refetchTrans={refetchTransactions} refetchCat={refetchCategories} category={id} addToCat={true} />
      ) : null }
      {categoryLoading ? (<Loader />) : categoryError ? (<div>Category Error</div>) : (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <h1>{category.name}</h1>
            <button type='button' className='icon-btn'><FiEdit2 /></button>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <h2>${Number(category.total).toLocaleString('en', {useGrouping:true})}</h2>
            <button className='icon-btn' type='button' onClick={onAddTransactionToCat} ><FiPlus /></button>
          </div>
        </div> 
      )}
      {transactionsLoading || categoryLoading ? (<Loader />) : transactionsError || categoryError ? (
        <div>Transactions Error</div>
      ) : (
        <div style={{textAlign: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <h1>Transactions</h1>
            <button className='category-color-btn' type='button' onClick={onAddTransaction} style={{borderColor: category.color, color: category.color, backgroundColor: `${category.color}20`}}>Add Transaction</button>
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
              <tbody key={transaction._id}  style={index % 2 === 0 ? ({backgroundColor: `${category.color}4d`}) : ({backgroundColor: `${category.color}30`})} className='table-row'>
                <tr>
                  <td className='td'>{new Date(transaction.date).getUTCMonth() + 1}/{new Date(transaction.date).getUTCDate()}/{new Date(transaction.date).getUTCFullYear()}</td>
                  <td className='td'>{transaction.category.name}</td>
                  <td className='td'>{transaction.name}</td>
                  <td className='td'>${Number(transaction.value).toLocaleString('en', {useGrouping:true})}</td>
                </tr>
              </tbody>
            ))}
          </table>
          {transactionsFetching ? (<Loader />) : (null)}
        </div>
      )}
    </div>
  )
}

export default CategoryScreen