import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    paycheck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paycheck",
    },
    categoryTotal: {
      type: Number,
      required: true,
    },
    userTotal: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction
