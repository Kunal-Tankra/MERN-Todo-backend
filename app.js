import express from "express"
import { router as userRouter } from "./routes/user.js"
import { router as taskRouter } from "./routes/task.js"
import { config } from "dotenv"
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middlewares/error.js"
import cors from "cors"

export const app = express()


// setup env
config({
    path: "./data/config.env"
})


// middlewares
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "HEAD", "POST", "PUT", "DELETE"],
    credentials: true,  //to send token in frontend
    optionsSuccessStatus: 200
}))
app.use(express.json())
app.use(cookieParser())

// using routes
app.use("/api/v1/user", userRouter)
app.use("/api/v1/task", taskRouter)


// custom error handler middleware
app.use(errorMiddleware)

app.get("/",(req, res)=>{
    res.send("nice working")
})