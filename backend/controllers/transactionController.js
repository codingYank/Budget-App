import asyncHandler from "../middleware/asyncHandler.js"
import Category from "../models/category.js"
import Transaction from "../models/transaction.js"
import User from "../models/user.js"

//get all user transactions
const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id }).populate(
    "category"
  )

  if (transactions) {
    res.status(200).json(transactions)
  } else {
    res.status(404)
    throw new Error("Transactions not found")
  }
})

//get category transactions
const getCategoryTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({
    category: req.params.category,
  }).populate("category")

  if (transactions) {
    res.status(200).json(transactions)
  } else {
    res.status(404)
    throw new Error("Transactions not found")
  }
})

//add transaction
const addTransaction = asyncHandler(async (req, res) => {
  const { name, value, category } = req.body
  const cat = await Category.findById(category)
  const user = await User.findById(req.user._id)

  if (!user) {
    throw new Error("User not found")
  } else if (!cat) {
    throw new Error("Category not found")
  }

  if ((value < 0 && Math.abs(value) <= cat.total) || value > 0) {
    cat.total = Number(cat.total) + Number(value)
    await cat.save()
    user.totalAvailable = Number(user.totalAvailable) + Number(value)
    await user.save()
    const transaction = await Transaction.create({
      name,
      value,
      category,
      user: user._id,
    })
    res.status(200).json(transaction)
  } else {
    throw new Error("Not enough funds")
  }
})

export { getTransactions, getCategoryTransactions, addTransaction }
