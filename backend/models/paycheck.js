import mongoose from "mongoose"

const paycheckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  favorite: {
    type: Boolean,
  },
  nickname: {
    type: String,
  },
  categories: [
    {
      category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
      },
      depositAmount: {
        type: Number,
        required: true,
      },
    },
  ],
},
{
  timestamps: true,
})

const Paycheck = mongoose.model("Paycheck", paycheckSchema)

export default Paycheck
