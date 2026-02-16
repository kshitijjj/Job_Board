import express from 'express'
import verifyToken from '../middlewares/token.js';
import jobControls from '../controllers/jobsControllers.js';

const route = express.Router();
const {getJobs,addJobs,removeJobs,updateJobs,applyJobs,saveJobs,userJobs,userJobsSaved}=jobControls;

// ACCESSIBLE TO ALL USERS
route.get('/jobs',getJobs);

// ADMIN AND RECRUITERS ROUTES
route.post('/jobs',verifyToken,addJobs);
route.delete('/jobs/delete/:jobId',verifyToken,removeJobs);
route.put('/jobs/edit/:jobId',verifyToken,updateJobs);

// ONLY FOR APPLICANTS ROUTES
route.post('/jobs/apply/:jobId',verifyToken,applyJobs);
route.post('/jobs/save/:jobId',verifyToken,saveJobs);
route.get('/jobs/applied/:userId',verifyToken,userJobs);
route.get('/jobs/saved/:userId',verifyToken,userJobsSaved);



export default route;