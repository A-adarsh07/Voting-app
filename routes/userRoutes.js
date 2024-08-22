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
        const user=await user.findOne({aadharCardNumber:aadharCardNumber});

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
        console.log(error);
        res.status(500).json({error:'Internal server errror'});
    }
})

 router.get('/profile',jwtAuthMiddleware,async(req,res) => {
    try {
        const userData = req.user;
        const userId = userData.id;
        const user=await Person.findById(userId);
        res.status(200).json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
 })

router.put('/profile/password',async(req,res)=> {
    try {
        const userId= req.user.id;
        const {currentPassword,newPassword}=req.body;

        const user=await user.findById(userId);

        if(!(await user.comparePassword(currentPassword))){
            return res.status(401).json({error:"Invalid username or password"});
        }
        user.password=newPassword;
        await user.save();

            console.log('password updated');
            res.status(200).json({message:"Password updated"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
})







module.exports=router;