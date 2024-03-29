import React, { useState, useEffect, useCallback, useRef } from "react"
import { useParams } from "react-router-dom"
import { useGetCategoryByIdQuery } from "../slices/categoriesApiSlice"
import Loader from "../components/Loader"
import {
  useDeleteTransactionMutation,
  useGetCategoryTransactionsQuery,
} from "../slices/transactionsApiSlice"
import "../styles/button.css"
import "../index.css"
import AddTransaction from "../components/AddTransaction"
import { FiEdit2, FiPlus } from "react-icons/fi"
import { FaMoneyBillTransfer } from "react-icons/fa6"
import { MdDelete } from "react-icons/md"
import EditCategory from "../components/EditCategory"
import { toast } from "react-toastify"
import Transfer from "../components/Transfer"

const CategoryScreen = () => {
  const { id } = useParams()

  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [showAddTransactionToCat, setShowAddTransactionToCat] = useState(false)
  const [showEditCategory, setShowEditCategory] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const [page, setPage] = useState(1)
  let pageCount = useRef(1)

  const onAddTransaction = () => {
    setShowAddTransaction(true)
  }

  const onAddTransactionToCat = () => {
    setShowAddTransactionToCat(true)
  }

  const onEditCategory = () => {
    setShowEditCategory(true)
  }

  const onTransfer = () => {
    setShowTransfer(true)
  }

  const {
    data: category,
    isLoading: categoryLoading,
    refetch: refetchCategory,
    error: categoryError,
  } = useGetCategoryByIdQuery(id)

  const {
    data: transactions,
    isLoading: transactionsLoading,
    refetch: refetchTransactions,
    isFetching: transactionsFetching,
    error: transactionsError,
  } = useGetCategoryTransactionsQuery({ id, page })

  const [deleteTransaction, { isLoading }] = useDeleteTransactionMutation()

  const onDelete = async (transaction) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${transaction.name} for ${transaction.value}?`
      )
    ) {
      try {
        await deleteTransaction({
          transaction: transaction._id,
          category: id,
        }).unwrap()
        refetchCategory()
        refetchTransactions()
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    } else {
      console.log("aborted")
    }
  }

  const handleScroll = useCallback(
    (e) => {
      const scrollPercent =
        (e.target.offsetHeight + e.target.scrollTop) / e.target.scrollHeight
      if (
        scrollPercent > 0.9 &&
        transactions.length % 30 === 0 &&
        !transactionsFetching
      ) {
        pageCount.current = transactions.length / 30 + 1
        setPage(pageCount.current)
        refetchTransactions()
      }
    },
    [refetchTransactions, transactions, transactionsFetching]
  )

  useEffect(() => {
    if (transactions) {
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [transactions, handleScroll])

  return (
    <div
      onScroll={(e) => handleScroll(e)}
      className="scroll"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {showAddTransaction ? (
        <AddTransaction
          show={setShowAddTransaction}
          refetchTrans={refetchTransactions}
          refetchCat={refetchCategory}
          category={id}
        />
      ) : null}
      {showAddTransactionToCat ? (
        <AddTransaction
          show={setShowAddTransactionToCat}
          refetchTrans={refetchTransactions}
          refetchCat={refetchCategory}
          category={id}
          addToCat={true}
        />
      ) : null}
      {showEditCategory ? (
        <EditCategory
          show={setShowEditCategory}
          category={category}
          refetchCat={refetchCategory}
        />
      ) : null}
      {showTransfer ? (
        <Transfer
          show={setShowTransfer}
          refetchTrans={refetchTransactions}
          refetchCat={refetchCategory}
          category={id}
        />
      ) : null}
      {categoryLoading ? (
        <Loader />
      ) : categoryError ? (
        <div>Category Error</div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <h1>{category.name}</h1>
            <button type="button" className="icon-btn" onClick={onEditCategory}>
              <FiEdit2 />
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <h2>
              $
              {Number(category.total).toLocaleString("en", {
                useGrouping: true,
              })}
            </h2>
            <button
              className="icon-btn"
              type="button"
              onClick={onAddTransactionToCat}
            >
              <FiPlus />
            </button>
            <button className="icon-btn" type="button" onClick={onTransfer}>
              <FaMoneyBillTransfer />
            </button>
          </div>
        </div>
      )}
      {transactionsLoading || categoryLoading ? (
        <Loader />
      ) : transactionsError || categoryError ? (
        <div>Transactions Error</div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>Transactions</h1>
            <button
              className="category-color-btn"
              type="button"
              onClick={onAddTransaction}
              style={{
                borderColor: category.color,
                backgroundColor: `${category.color}20`,
              }}
            >
              Add Transaction
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th className="th">Date</th>
                <th className="th">Category</th>
                <th className="th">Name</th>
                <th className="th">Amount</th>
                <th className="th"></th>
              </tr>
            </thead>
            {transactions.map((transaction, index) => (
              <tbody
                key={transaction._id}
                style={
                  index % 2 === 0
                    ? { backgroundColor: `${category.color}4d` }
                    : { backgroundColor: `${category.color}30` }
                }
                className="table-row"
              >
                <tr style={{ height: "34px" }}>
                  <td className="td">
                    {new Date(transaction.date).getUTCMonth() + 1}/
                    {new Date(transaction.date).getUTCDate()}/
                    {new Date(transaction.date).getUTCFullYear()}
                  </td>
                  <td className="td">{transaction.category.name}</td>
                  <td className="td">{transaction.name}</td>
                  <td className="td">
                    $
                    {Number(transaction.value).toLocaleString("en", {
                      useGrouping: true,
                    })}
                  </td>
                  <td className="td">
                    {transaction.paycheck || transaction.transfer === true ? null : (
                      <button
                        className="danger-btn"
                        disabled={isLoading}
                        onClick={() => onDelete(transaction)}
                        style={{
                          fontSize: "18px",
                          padding: ".3rem .4rem 0rem .4rem",
                        }}
                      >
                        <MdDelete />
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          {transactionsFetching ? <Loader /> : null}
        </div>
      )}
    </div>
  )
}

export default CategoryScreen
