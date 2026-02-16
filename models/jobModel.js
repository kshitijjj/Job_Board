import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    jobId:{
        type:String,
    },
    title:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    jobDescription:{
        type:String
    },
    salary:{
        type:String
    },
    location:{
        type:String,
    },
    jobPosted:{
        type:String
    },
    postedBy:{
        type:String
    }
})

const jobModel=mongoose.model('jobModel',jobSchema);
export default jobModel;