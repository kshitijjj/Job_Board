import summaryResponses from '../services/ollamaSummaryService.js';

const {summaryResponse,textFileSummaryResponse}=summaryResponses;
const fileSummary=async(req,res)=>{
    try {
        const fileUploaded=await summaryResponse(req.file);
        return res.status(200).json({message:fileUploaded.message});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}

const textFileSummary=async(req,res)=>{
    try {
        const textFile=await textFileSummaryResponse(req.body);
        return res.status(200).json({message:textFile.message});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export default {fileSummary,textFileSummary};