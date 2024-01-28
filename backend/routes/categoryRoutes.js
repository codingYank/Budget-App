import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import {
  createCategory,
  getCategoryById,
  getUserCategories,
  updateCategory,
} from "../controllers/categoryController.js"
const router = express.Router()

router.route("/:id").get(protect, getCategoryById).put(protect, updateCategory)
router.route("/").get(protect, getUserCategories).post(protect, createCategory)

export default router
