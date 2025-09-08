
import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL!)
        console.log("connected to DB");
        


    } catch (error) {
        console.error(`ERROR: ${error}`);
        process.exit(1)
        
    }
}

export {connectDB}