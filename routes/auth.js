import express from 'express';
import authControllers from '../controllers/authControllers.js';
import passport from 'passport';
import '../config/passport.js';
import verifyToken from '../middlewares/token.js';

const {authSignup,authLogin,googleOauth}=authControllers;
const route=express.Router();

route.post('/signup',authSignup);
route.post('/login',authLogin);

route.get('/auth/google',passport.authenticate("google",{scope:['profile','email']}));
route.get('/auth/google/callback',passport.authenticate("google",{session:false}),googleOauth);


export default route;