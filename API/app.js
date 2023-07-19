const express = require('express');
const app = express();
const mongoose = require('mongoose');
const AlumniAccount = require('./models/AlumniAccount')
const PostRoute = require('./routes/PostRoute')
const AccountRoute = require('./routes/AccountRoute')

var cors = require('cors')
app.use(cors())
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
    res.send("Home")
})



app.use(PostRoute);
app.use(AccountRoute);
app.listen(3000,()=>{
    console.log("listening port 3000")
})


