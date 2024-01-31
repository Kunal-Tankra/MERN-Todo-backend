
import mongoose from "mongoose"

export const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Todo"
    }).then((c)=>{
        console.log("db connected " + c.connection.host)
    }).catch(error=>{
        console.log(error)
    })
}