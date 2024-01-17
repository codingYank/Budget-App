import express from "express"

import { protect } from "../middleware/authMiddleware.js"
import {
  addTransaction,
  getCategoryTransactions,
  getTransactions,
} from "../controllers/transactionController.js"
const router = express.Router()

router.route("/").get(protect, getTransactions).post(protect, addTransaction)
router.route("/:category").get(protect, getCategoryTransactions)

export default router
