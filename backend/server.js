import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config()
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import transactionRoutes from "./routes/transactionRoutes.js"
import { errorHandler } from "./middleware/errorMiddleware.js"
const port = process.env.PORT || 5000

connectDB()

const app = express()

//body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Cookie parser middleware
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("API is running")
})

app.use("/api/users", userRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/transactions", transactionRoutes)

app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`))
