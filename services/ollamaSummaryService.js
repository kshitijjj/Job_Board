import functions from '../config/ollama.js';
import {PDFParse} from 'pdf-parse';
import axios from 'axios';

const {url,data,options}=functions;

const summaryResponse=async(file)=>{
    try {
        let result="";
        if(file.mimetype==='application/pdf'){
            const filePDF=new PDFParse(new Uint8Array(file.buffer));
            result=(await filePDF.getText()).text;            
        }
        data.prompt=`Analyze the following content and generate a clear, well-structured summary highlighting the key points:${result}`
        const summary=await axios.post(url,data,options);
        return {message:summary.data.response};
    } catch (error) {
        console.log(error);
        return null;
    }
}

const textFileSummaryResponse=async({text})=>{
    try {
        let result=text;
        data.prompt=`Analyze the following content and generate a clear, well-structured summary highlighting the key points:${result}`
        const textSummary=await axios.post(url,data,options);
        return {message:textSummary.data.response};
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default {summaryResponse,textFileSummaryResponse};