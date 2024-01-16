import asyncHandler from "../middleware/asyncHandler.js"
import Category from "../models/category.js"
import User from "../models/user.js"

const getUserCategories = asyncHandler(async (req, res) => {
  const categories = Category.find({ user: req.user._id })

  if (categories) {
    res.status(200).json(categories)
  } else {
    res.status(404)
    throw new Error("Categories not found")
  }
})

const createCategory = asyncHandler(async (req, res) => {
  const { name, total } = req.body
  const user = await User.findById(req.user._id)
  const categoryExists = await Category.findOne({ user, name })

  if (categoryExists) {
    res.status(400)
    throw new Error("Category already exists")
  } else if (user && total > user.uncategorized) {
    res.status(400)
    throw new Error("Not enough funds")
  }

  user.uncategorized -= total
  await user.save()

  const category = await Category.create({
    name,
    total,
    user: user._id,
  })

  if (category) {
    res.status(201).json(category)
  } else {
    res.status(400)
    throw new Error("Invalid Category Data")
  }
})

export { getUserCategories, createCategory }
