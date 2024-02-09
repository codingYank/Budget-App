import React, { useState } from "react"
import { useGetCategoriesQuery } from "../slices/categoriesApiSlice"
import { useGetRecentTransactionsQuery } from "../slices/transactionsApiSlice"
import { useGetUserQuery, useLogoutMutation } from "../slices/usersApiSlice"
import Loader from "../components/Loader"
import CategoryCard from "../components/CategoryCard"
import "../styles/table.css"
import "../styles/button.css"
import AddCategory from "../components/AddCategory"
import AddTransaction from "../components/AddTransaction"
import AddPaycheck from "../components/AddPaycheck"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../slices/authSlice"
import { toast } from "react-toastify"

const DashboardScreen = () => {
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [showAddPaycheck, setShowAddPaycheck] = useState(false)

  const addCategory = () => {
    setShowAddCategory(true)
  }

  const [categoryToAddTrans, setCategoryToAddTrans] = useState()
  const onAddTransaction = (e, id) => {
    e.preventDefault()
    setCategoryToAddTrans(id)
    setShowAddTransaction(true)
  }

  const onAddPaycheck = () => {
    setShowAddPaycheck(true)
  }

  const {
    data: categories,
    refetch: refetchCategories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery()

  const {
    data: recentTransactions,
    refetch: refetchRecentTransactions,
    isLoading: recentTransactionsLoading,
    error: recentTransactionsError,
  } = useGetRecentTransactionsQuery()

  const {
    data: user,
    refetch: refetchUser,
    isLoading: userLoading,
    error: userError,
  } = useGetUserQuery()

  const [logoutApiCall] = useLogoutMutation()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate("/login")
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      className="scroll"
    >
      {showAddCategory ? (
        <AddCategory
          show={setShowAddCategory}
          refetchCategories={refetchCategories}
          refetchUser={refetchUser}
        />
      ) : null}
      {showAddTransaction ? (
        <AddTransaction
          show={setShowAddTransaction}
          refetchTrans={refetchRecentTransactions}
          refetchCat={refetchCategories}
          refetchUser={refetchUser}
          category={categoryToAddTrans}
        />
      ) : null}
      {showAddPaycheck ? (
        <AddPaycheck
          show={setShowAddPaycheck}
          refetchCategories={refetchCategories}
          refetchUser={refetchUser}
          categories={categories}
        />
      ) : null}
      {/* <input type='color' onChange={(e) => printColor(e)}></input> */}
      {userLoading ? (
        <Loader />
      ) : userError ? (
        <div>User Error</div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "hsl(135, 100%, 32%)",
              height: "250px",
              width: "250px",
              borderRadius: "9999px",
              marginTop: "15px",
              color: "white",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h1>Total</h1>
              <h3>
                $
                {Number(user.totalAvailable).toLocaleString("en", {
                  useGrouping: true,
                })}
              </h3>
            </div>
            <div style={{ textAlign: "center" }}>
              <h2>Uncategorized</h2>
              <h4>
                $
                {Number(user.uncategorized).toLocaleString("en", {
                  useGrouping: true,
                })}
              </h4>
            </div>
          </div>

          <button className="primary-btn" type="button" onClick={onAddPaycheck}>
            Add Paycheck
          </button>
          <Link className="primary-btn" to={'/paychecks'}>View Paychecks</Link>
        </div>
      )}
      {categoriesLoading ? (
        <Loader />
      ) : categoriesError ? (
        <div>Category Error</div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <h1>Categories</h1>
            <button className="primary-btn" type="button" onClick={addCategory}>
              New +
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              flexWrap: "wrap",
              maxWidth: "900px",
            }}
          >
            {categories.map((category) => (
              <CategoryCard
                key={category._id}
                category={category}
                onAddTransaction={onAddTransaction}
              />
            ))}
          </div>
        </div>
      )}
      {recentTransactionsLoading ? (
        <Loader />
      ) : recentTransactionsError ? (
        <div>Recent Transactions Error</div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1>Recent Transactions</h1>
          <table className="table">
            <thead>
              <tr>
                <th className="th">Date</th>
                <th className="th">Category</th>
                <th className="th">Name</th>
                <th className="th">Amount</th>
              </tr>
            </thead>
            {recentTransactions.map((transaction) => (
              <tbody
                key={transaction._id}
                style={{ backgroundColor: `${transaction.category.color}40` }}
                className="table-row"
              >
                <tr>
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
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
      <button className="danger-btn" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  )
}

export default DashboardScreen
