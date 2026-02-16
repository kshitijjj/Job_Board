import mongoose from "mongoose"

const jobPostSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userAuthModel'
    },
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'jobModel'
    }
})

const jobsPostModel=mongoose.model("jobsPostModel",jobPostSchema);
export default jobsPostModel;