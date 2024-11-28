const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.post("/register", async (req,res)=>{
    try{
        const {username,email,enrollment_number,password} = req.body
        const user = new User({ username,email,enrollment_number, password});
        await user.save();
        res.status(201).json({ message: 'registered' });
    }
    catch (error){
        res.status(500).json({ message: 'registration failed' });
    }
})


router.post("/login",async (res,req)=>{
    try{
        const {username,password} = req.body
        const user = await User.findOne({ username });
        
    }
    catch{
        
    }
})