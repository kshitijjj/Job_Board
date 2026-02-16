import options from '../config/jobApi.js';
import dotenv from 'dotenv';
import jobModel from '../models/jobModel.js';
import axios from 'axios';
import jobPostModel from '../models/jobPostModel.js'
import jobAppliedModel from '../models/jobApplied.js'
dotenv.config();

const fetchJobs=async({location,title})=>{
    try {
        options.params.location=location || "India";
        options.params.query=title || "Technology";

        const jobDB=await jobModel.find({location:location});
        if(jobDB.length>0)return {message:jobDB};

        /*
        const response=await axios.get(process.env.job_url,options);
        if(response)jobResponse=response.data;
        
        const apiResponse=JSON.parse(response.data);
        apiResponse.map(async(j)=>{
            const jobId=j.id;
            const ifexist=await jobModel.findOne({jobId});
            if(!ifexist){
                const newJob=new jobModel({title:j.title,company:j.company,jobId:j.id,location:j.location,jobPosted:j.postedTimeAgo,postedBy:j.jobProvider});
                await newJob.save();    
            }
        })*/
    } catch (error) {
        console.log(error)
        return null;
    }
}

const postJobs=async({id,title,company,location,jobPosted,postedBy},userId)=>{
    try {
        const isexist=await jobModel.findOne({jobId:id});
        if(!isexist){
            const jobPost=new jobModel({jobId:id,title,company,location,jobPosted,postedBy});
            await jobPost.save();

            const jobByUser=new jobPostModel({userId:userId,jobId:jobPost._id});
            await jobByUser.save();

            return {message:"Job posted successfully"};
        }else{
            return {message:'Job Already Added'};
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteJob=async(jobId,userId)=>{
    try {
        const isjob=await jobPostModel.findOne({userId:userId,jobId:jobId});
        if(!isjob)return {message:"Job not found"};
        await jobPostModel.deleteOne({userId,jobId});
        await jobModel.findByIdAndDelete(jobId);
        return {message:"Job deleted successfully"};
    } catch (error) {
        console.log(error);
        return null;
    }
}

const editJobs=async({id,title,company,location,jobPosted,postedBy},jobId,userId)=>{
    try {
        const isjob=await jobPostModel.findOne({userId,jobId});
        if(!isjob)return {message:'Job not found'};
        await jobModel.findByIdAndUpdate(jobId,{jobId:id,title,company,location,jobPosted,postedBy});
        return {message:"Job updated successfully"};
    } catch (error) {
        console.log(error);
        return null;
    }
}

const jobApplication=async(jobId,userId)=>{
    try {
        const isJob=await jobModel.findOne({_id:jobId});
        if(!isJob)return {message:"Job not found"};

        const jobApplied=await jobAppliedModel.findOne({userId:userId,jobId:jobId});
        if(jobApplied){
            if(jobApplied.applied===false){
                jobApplied.applied=true;
            }else return{message:"Job already applied"}
        }
        else{
            const newJobApplied=await jobAppliedModel({userId,jobId,applied:true,appliedDate:Date.now()});
            await newJobApplied.save();
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const savedJobs=async(jobId,userId)=>{
    try {
        const isjob=await jobModel.findOne({_id:jobId});
        if(!isjob)return {message:"Job not found"};
        
        const jobSaved=await jobAppliedModel({userId:userId,jobId:jobId});
        if(jobSaved){
            return {message:"Job already applied/saved"};
        }
        const jobsave=new jobAppliedModel({userId,jobId,saved:true,appliedDate:Date.now()});
        await jobsave.save();
        return {message:"Job saved successfully"};
    } catch (error) {
        console.log(error);
        return null;
    }
}

const userApplications=async(userId)=>{
    try {
        const allappliedJobs=await jobAppliedModel.find({userId,applied:true})
        if(!allappliedJobs)return {message:"No Jobs found"};
        return {message:allappliedJobs};
    } catch (error) {
        console.log(error);
        return null;
    }
}

const userSavedApplications=async(userId)=>{
    try {
        const allsavedjobs=await jobAppliedModel.find({userId,saved:true});
        if(!allsavedjobs)return {message:"No Jobs found"};
        return {message:allsavedjobs};
    } catch (error) {
        console.log(error)
        return null;
    }
}

export default {fetchJobs,postJobs,deleteJob,editJobs,jobApplication,savedJobs,userApplications,userSavedApplications};