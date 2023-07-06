const express = require('express');
const app = express();
const mongoose = require('mongoose');
const AlumniAccount = require('./models/AlumniAccount')

app.use(express.json())

mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://save1412:save1412@cluster0.nsshdfm.mongodb.net/AlumniAccount')
.then(()=> {
    console.log("MongoDB connected")
}).catch((error) =>{
    console.log(error);
})
//Routes

app.get('/', (req,res)=>{
    res.send("kuy jaa")
})

app.get('/AllAccount', async(req,res) =>{
    try {
        const Accounts = await AlumniAccount.find({});
        res.status(200).json(Accounts);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

app.post('/register', async(req,res)=>{
    try{
        const alumniAccount = await AlumniAccount.create(req.body)
        res.status(200).json(alumniAccount);
    }catch(error){
        res.status(500).json({message: error.message})
    }
    
})

app.listen(3000,()=>{
    console.log("Kuy")
})


