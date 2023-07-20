const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const AccountModel = require('../models/AlumniAccount');
require('dotenv').config();
router.post("/login", async (req,res) => {
    try{
        const Account = await AccountModel.findOne({Email : req.body.Email});
        !user && res.status(401).json("Unauthorized");

        const hashedPassword = CryptoJS.AES.decrypt(
            Account.Password,
            process.env.HASH_KEY
            
        );
    }catch(error){
        res.status(500).json(err.message);
    }
})