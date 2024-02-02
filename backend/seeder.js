import dotenv from "dotenv"
import connectDB from "./config/db.js"
import Category from "./models/category.js"
import User from "./models/user.js"
import Transaction from "./models/transaction.js"
import users from "./data/user.js"
import categories from "./data/categories.js"
import transactions from "./data/transactions.js"
import Paycheck from "./models/paycheck.js"

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Category.deleteMany()
    await User.deleteMany()
    await Transaction.deleteMany()

    const createdUsers = await User.insertMany(users)

    const tyler = createdUsers[0]._id

    const sampleCategories = categories.map((category) => {
      return { ...category, user: tyler }
    })

    const DBCategories = await Category.insertMany(sampleCategories)

    const food = DBCategories[0]._id

    const sampleTransactions = transactions.map((transaction) => {
      return { ...transaction, category: food }
    })

    await Transaction.insertMany(sampleTransactions)
    console.log("Data imported")
    process.exit(1)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    await Category.deleteMany()
    await Transaction.deleteMany()
    await Paycheck.deleteMany()

    console.log("Data Destroyed")
    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
