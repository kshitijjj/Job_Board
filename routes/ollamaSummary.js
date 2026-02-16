import express from 'express';
import summary from '../controllers/ollamaSummaryController.js';
const route=express.Router();
const upload=multer();

const {fileSummary,textFileSummary}=summary;

route.post('/file/upload',verifyToken,upload.single('file'),fileSummary);
route.post('/upload',verifyToken,textFileSummary);

export default route;
