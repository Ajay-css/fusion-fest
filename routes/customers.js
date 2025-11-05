const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Register
router.post('/register', async (req,res)=>{
    try{
        const existing = await Customer.findOne({ $or:[{username:req.body.username},{email:req.body.email}] });
        if(existing) return res.status(400).json({ message:"Customer already exists" });
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json(customer);
    }catch(err){ res.status(400).json({ message:err.message }); }
});

// Login
router.post('/login', async (req,res)=>{
    try{
        const { username, password } = req.body;
        const customer = await Customer.findOne({ $or:[{username},{email:username}] });
        if(!customer || customer.password!==password) return res.status(401).json({ message:"Invalid credentials" });
        const data = customer.toObject();
        delete data.password;
        res.json(data);
    }catch(err){ res.status(500).json({ message:err.message }); }
});

module.exports = router;