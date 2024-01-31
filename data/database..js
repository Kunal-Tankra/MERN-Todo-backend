
import mongoose from "mongoose"

export const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Todo"
    }).then(()=>{
        console.log("db connected")
    }).catch(error=>{
        console.log(error)
    })
}