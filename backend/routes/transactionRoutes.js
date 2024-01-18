import express from "express"

import { protect } from "../middleware/authMiddleware.js"
import {
  addPaycheck,
  addTransaction,
  getCategoryTransactions,
  getTransactions,
} from "../controllers/transactionController.js"
const router = express.Router()

router.route("/").get(protect, getTransactions).post(protect, addTransaction)
router.route("/:category").get(protect, getCategoryTransactions)
router.route("/paycheck").post(protect, addPaycheck)

export default router
