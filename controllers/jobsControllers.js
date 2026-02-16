import jobServices from '../services/jobServices.js';

const {fetchJobs,postJobs,deleteJob,editJobs,jobApplication,savedJobs,userApplications,userSavedApplications}=jobServices;

const getJobs=async(req,res)=>{
    try {
        const jobsList=await fetchJobs(req.query);
        return res.status(200).json({message:jobsList});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'});
    }
}

const addJobs=async(req,res)=>{
    try {
        const userId=req.user.userId;
        const addJob=await postJobs(req.body,userId);
        return res.status(201).json({message:addJob.message});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'});
    }
}

const removeJobs=async(req,res)=>{
    try {
        const userId=req.user.userId;
        const jobDelete=await deleteJob(req.params.jobId,userId);
        return res.status(200).json({message:jobDelete.message});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error occurs"});
    }
}

const updateJobs=async(req,res)=>{
    try {
        const userId=req.user.userId;
        const jobUpdate=await editJobs(req.body,req.params.jobId,userId);
        return res.status(201).json({message:jobUpdate.message});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error occurs"});
    }
}

const applyJobs=async(req,res)=>{
    try {
        const userId=req.user.userId;
        const jobApply=await jobApplication(req.params.jobId,userId);
        return res.status(200).json({message:jobApply.message});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error occurs"});
    }
}

const saveJobs=async(req,res)=>{
    try {
        const userId=req.user.userId;
        const jobSaved=await savedJobs(req.params.jobId,userId);
        return res.status(200).json({message:jobSaved.message});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error occurs"});
    }
}

const userJobs=async(req,res)=>{
    try {
        const userId=req.user.userId;
        const userappliedjobs=await userApplications(req.params.userId);
        return res.status(200).json({message:userappliedjobs.message});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error occurs"});
    }
}

const userJobsSaved=async(req,res)=>{
    try {
        const userId=req.user.userId;
        const usersavedjobs=await userSavedApplications(req.params.userId);
        return res.status(200).json({message:usersavedjobs.message});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error occurs"});
    }
}

export default {getJobs,addJobs,removeJobs,updateJobs,applyJobs,saveJobs,userJobs,userJobsSaved};