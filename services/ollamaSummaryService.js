import options from '../config/ollama.js';

const summaryResponse=async(file)=>{
    try {
        let result="";
        if(file.mimetype==='application/pdf'){
            const filePDF=new pdfParse(new Uint8Array(file));
            result=(await filePDF.getText()).text;            
        }
        options.data.prompt=`Analyze the following content and generate a clear, well-structured summary highlighting the key points:${result}`
        const summary=await axios.post(options);
        return {message:summary.data.response};
    } catch (error) {
        console.log(error);
        return null;
    }
}

const textFileSummaryResponse=async(text)=>{
    try {
        let result=text;
        options.data.prompt=`Analyze the following content and generate a clear, well-structured summary highlighting the key points:${result}`
        const textSummary=await axios.post(options);
        return {message:textSummary.data.response};
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default {summaryResponse,textFileSummaryResponse};