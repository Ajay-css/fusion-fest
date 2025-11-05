const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');

// Get all vendors
router.get('/', async (req,res)=>{
    try{
        const vendors = await Vendor.find().select('-password');
        res.json(vendors);
    }catch(err){ res.status(500).json({ message:err.message }); }
});

// Register
router.post('/register', async (req,res)=>{
    try{
        const normalizedData = {...req.body, username:req.body.username.toLowerCase().trim(), email:req.body.email.toLowerCase().trim()};
        const existing = await Vendor.findOne({ $or:[{username:normalizedData.username},{email:normalizedData.email}] });
        if(existing) return res.status(400).json({ message:"Username or email already exists" });
        const vendor = new Vendor(normalizedData);
        await vendor.save();
        const data = vendor.toObject(); delete data.password;
        res.status(201).json(data);
    }catch(err){ res.status(400).json({ message:err.message }); }
});

// Login
router.post('/login', async (req,res)=>{
    try{
        const { username,password } = req.body;
        const normalizedUsername = username.toLowerCase().trim();
        const vendor = await Vendor.findOne({ $or:[{username:normalizedUsername},{email:normalizedUsername}] });
        if(!vendor || vendor.password!==password) return res.status(401).json({ message:"Invalid credentials" });
        const data = vendor.toObject(); delete data.password;
        res.json(data);
    }catch(err){ res.status(500).json({ message:err.message }); }
});

module.exports = router;