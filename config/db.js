import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const databaseConnect=async(req,res)=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connected with backend server successfully");
    } catch (error) {
        console.log(error)
    }
}

export default databaseConnect;