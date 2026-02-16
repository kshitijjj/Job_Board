import express from 'express'
import cors from 'cors'
import databaseConnect from './config/db.js'
import authRoute from './routes/auth.js'
import jobRoute from './routes/jobs.js'
import summaryRoute from './routes/ollamaSummary.js';
databaseConnect();

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user',authRoute);
app.use('/',jobRoute);
app.use('/ollama',summaryRoute);

app.listen(process.env.PORT,(req,res)=>{
    console.log(`Backend server connected successfully at port ${process.env.PORT}`)
})


