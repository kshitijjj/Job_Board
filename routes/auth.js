import express from 'express';
import authControllers from '../controllers/authControllers.js';
import passport, { session } from 'passport'

const {authSignup,authLogin,googleOauth}=authControllers;
const route=express.Router();

route.post('/signup',authSignup);
route.post('/login',authLogin);

passport.authenticate("google",scope=['profile','email'],async(req,res));
passport.authenticate("google",session=false,googleOauth);

export default route;