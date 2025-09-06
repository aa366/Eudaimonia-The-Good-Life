import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
// customs 
import {connectDB} from "./config/db.ts"


console.clear()

console.log("Hello Abdelwahab");

dotenv.config()
const port :string = process.env.PORT || "5000"
const db = connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/",(req,res)=> res.send("hello world")
)

app.listen(port, ()=> 
    console.log(`server running ${port}`)
)





