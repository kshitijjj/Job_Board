import express from 'express';
import authControllers from '../controllers/authControllers.js';
const {authSignup,authLogin}=authControllers;
const route=express.Router();

route.post('/signup',authSignup);
route.post('/login',authLogin);

export default route;