import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
// customs 
import {connectDB} from "./config/db.ts"
import userRouter from "./routes/userRoutes.ts";
import categoryRoutes from "./routes/categoryRoutes.ts";

declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}

dotenv.config()
console.clear()

console.log("Hello Abdelwahab");

const port :string = process.env.PORT || "5000"

const db = connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api/users" , userRouter)
app.use("/api/category" , categoryRoutes)

app.listen(port, ()=> 
    console.log(`server running ${port}`)
)





