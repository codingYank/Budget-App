import asyncHandler from "../middleware/asyncHandler.js"
import Category from "../models/category.js"
import Paycheck from "../models/paycheck.js"
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

  if (value !== 0) {
    cat.total = Number(cat.total) + Number(value)
    await cat.save()
    if (value < 0) {
      user.totalAvailable = Number(user.totalAvailable) + Number(value)
      await user.save()
    } else if (value > 0) {
      user.uncategorized = Number(user.uncategorized) - Number(value)
      await user.save()
    }
    const transaction = await Transaction.create({
      name,
      value,
      category,
      user: user._id,
    })
    res.status(200).json(transaction)
  } else {
    throw new Error("Enter value for transaction")
  }
})

const addPaycheck = asyncHandler(async (req, res) => {
  const { name, value, categories } = req.body
  let newValue = value
  const user = await User.findById(req.user._id)
  console.log(req.body)
  let totalDeposit = 0
  categories.forEach((category) => {
    totalDeposit = Number(category.depositAmount) + Number(totalDeposit)
  })
  console.log(totalDeposit)
  const uncategorized = value - totalDeposit
  if (totalDeposit <= value) {
    const paycheck = await Paycheck.create({
      name,
      value,
      user: user._id,
      categories,
    })
    categories.forEach(async (category) => {
      if (category.depositAmount > 0) {
        const cat = await Category.findById(category.category)
        cat.total = Number(cat.total) + Number(category.depositAmount)
        await cat.save()
        newValue = Number(value) - Number(category.depositAmount)
        await Transaction.create({
          name,
          value: category.depositAmount,
          category: cat._id,
          user: user._id,
          paycheck,
        })
      }
    })
    user.totalAvailable = Number(user.totalAvailable) + Number(newValue)
    user.uncategorized = Number(user.uncategorized) + Number(uncategorized)
    await user.save()
    if (paycheck) {
      res.status(200).json(paycheck)
    } else {
      throw new error("paycheck failed")
    }
  } else {
    throw new Error("Category deposits greater than total paycheck")
  }
})

const getPaychecks = asyncHandler(async (req, res) => {
  const paychecks = await Paycheck.find({ user: req.user._id }).populate(
    "categories.category"
  )

  if (paychecks) {
    res.status(200).json(paychecks)
  } else {
    res.status(404)
    throw new Error("Paychecks not found")
  }
})

export {
  getTransactions,
  getCategoryTransactions,
  addTransaction,
  addPaycheck,
  getPaychecks,
}