import mongoose from "mongoose"

const jobAppliedSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userAuthModel'
    },
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'jobModel'
    },
    applied:{
        type:Boolean,
        default:false,
        required:true
    },
    saved:{
        type:Boolean,
        default:false,
        required:true
    },
    appliedDate:{
        type:Date
    }
})

const jobsAppliedModel=mongoose.model("jobsAppliedModel",jobAppliedSchema);
export default jobsAppliedModel;