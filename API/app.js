const express = require('express');
const app = express();
const mongoose = require('mongoose');
const AlumniAccount = require('./models/AlumniAccount')
const PostRoute = require('./routes/PostRoute')
const AccountRoute = require('./routes/AccountRoute')
var cors = require('cors')
app.use(cors())
app.use(express.json({ limit: '50mb' }));

app.use(express.json())
require('dotenv').config();
const mongoKey = process.env.MONGO_KEY;
mongoose.set("strictQuery", false)
mongoose.connect(mongoKey)
.then(()=> {
    console.log("MongoDB connected")
}).catch((error) =>{
    console.log(error);
})
//Routes

app.get('/', (req,res)=>{
    res.send("Home")
})


app.use(PostRoute);
app.use(AccountRoute);
app.listen(8000,()=>{
    console.log("listening port 3000")
})


