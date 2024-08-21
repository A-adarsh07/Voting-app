const express = require('express');
const router=express.Router();
const User=require('./../models/user');
const {jwtAuthMiddleware,generateToken} = required('./../jwt');


router.post('/signup',async(req,res) => {
    try {
        const data = req.body
        const newUser= new User(data);
        const response =await newUser.save();
        console.log('data saved');
        
        const payload = {
            id:response.id
        }
        console.log(JSON.stringify(payload));
        const token=generateToken(payload);
        console.log("Token is ", token);
        res.status(200).json({response:response,token:token});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
})


router.login('/login',async (req,res) => {
    try {
        // Extract aadharcardnumber and password from request body 
        const {aadharCardNumber,password} =req.body;

        // find the user by aadharcardNumber
        const user=await personalbar.findOne({aadharCardNumber:aadharCardNumber});

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid username or password'});
        }
        // generate token
        const payload={
            id:user.id,
        }
        const token =generateToken(payload);
        // return token as response
        res.json({token});
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Internal server errror'});
    }
})