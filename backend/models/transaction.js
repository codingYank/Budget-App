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
  },
  {
    timestamps: true,
  }
)

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction
