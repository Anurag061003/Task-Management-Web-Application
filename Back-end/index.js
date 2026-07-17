require('dotenv').config();
const express= require('express');
const app= express();
const cors= require('cors')
const connect =require('./connection')
const task = require('./routes/task')
const user=require('./routes/user')
const port=process.env.PORT || 4000
app.use(cors());
app.use(express.json());
app.use(task)
app.use(user)
connect();
app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Server is running on the port 4000")
    }
})
