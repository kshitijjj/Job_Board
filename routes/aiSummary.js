import express from 'express';
import multer from 'multer'
import middlewares from '../middlewares/token.js';
import axios from 'axios';
import funcitons from '../controllers/ollama.js';

const {verifyToken,restrictedAccess}=middlewares;
const {url,data,options}=funcitons;

const upload=multer();
const route=express.Router();

route.post('/upload',verifyToken,upload.single('file'),async(req,res)=>{
    try {
        const file=req.file;
        if(file.mimetype==='application/pdf'){
            const filePDF=new pdfParse(new Uint8Array(file));
            let result=(await filePDF.getText()).text;
            res.status(200);
        }
        const summary=await axios.post(url,{
            "model":"gemini-3-flash-preview",
            "prompt":`can you provide the summary of the above file : ${result}`,
            "stream":false
        },options)
        res.status(200).json({message:summary.data.response});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server error'});
    }
})

export default route;
