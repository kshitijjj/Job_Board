import express from 'express';
import multer from 'multer';
import summary from '../controllers/ollamaSummaryController.js';
import verifyToken from '../middlewares/token.js';

const route=express.Router();
const upload=multer();

const {fileSummary,textFileSummary}=summary;

route.post('/file/upload',verifyToken,upload.single('file'),fileSummary);
route.post('/text/upload',verifyToken,textFileSummary);

export default route;
