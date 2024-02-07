import asyncHandler from "../middleware/asyncHandler.js"
import Category from "../models/category.js"
import User from "../models/user.js"

const getUserCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ user: req.user._id })

  if (categories) {
    res.status(200).json(categories)
  } else {
    res.status(404)
    throw new Error("Categories not found")
  }
})

const createCategory = asyncHandler(async (req, res) => {
  const { name, total, color } = req.body
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
    color,
    user: user._id,
  })

  if (category) {
    res.status(201).json(category)
  } else {
    res.status(400)
    throw new Error("Invalid Category Data")
  }
})

const getCategoryById = asyncHandler(async (req, res) => {
  console.log(req.params)
  const category = await Category.findById(req.params.id)

  if (category) {
    res.status(200).json(category)
  } else {
    throw new Error("Category not found")
  }
})

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.body.id)

  if (category) {
    category.name = req.body.name || category.name
    category.color = req.body.color || category.color
    const updatedCategory = await category.save()

    res.status(200).json(updatedCategory)
  } else {
    throw new Error("Category not found")
  }
})

export { getUserCategories, createCategory, getCategoryById, updateCategory }
