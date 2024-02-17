import express from "express"

import { protect } from "../middleware/authMiddleware.js"
import {
  addPaycheck,
  addTransaction,
  deleteTransaction,
  favoriteAPaycheck,
  getCategoryTransactions,
  getFavoritePaychecks,
  getPaychecks,
  getRecentTransactions,
  getTransactions,
  unFavoriteAPaycheck,
} from "../controllers/transactionController.js"

const router = express.Router()

router.get("/paycheck/favorites", protect, getFavoritePaychecks)
router.put('/paycheck/favorite', protect, favoriteAPaycheck)
router.put('/paycheck/unfavorite', protect, unFavoriteAPaycheck)
router.route("/paycheck").post(protect, addPaycheck).get(protect, getPaychecks)
router.get("/recent", protect, getRecentTransactions)
router.route("/:category").get(protect, getCategoryTransactions)
router
  .route("/")
  .get(protect, getTransactions)
  .post(protect, addTransaction)
  .delete(protect, deleteTransaction)

export default router
