import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import {
  createCategory,
  getUserCategories,
} from "../controllers/categoryController.js"
const router = express.Router()

router.route("/").get(protect, getUserCategories).post(protect, createCategory)

export default router
