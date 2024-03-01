const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const AccountModel = require('../models/AlumniAccount')

const verified = asyncHandler(async(req,res,next)=>{
    let token
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            req.user = await AccountModel.findById(decoded.id).select('-Password')
            
            next()
        }catch(err){
            res.json(err)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('No token')
    }
})
const isAdmin = asyncHandler(async(req,res,next)=>{
    let token
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            req.user = await AccountModel.findById(decoded.id).select('-Password')
            
            if(req.user.Permission !== 'admin'){
                res.status(401).json('not-admin')
                
            }
            next()
        }catch(err){
            res.json(err)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }
    if(!token){
        res.status(401).json('no-token')
        throw new Error('No token')
    }
})



module.exports = {
    verified,
    isAdmin
}