
const express = require('express');
const cors = require('cors');
const lRegister = require('../models/login')
const  User  = require('../models/login');
const { exists } = require('../models/signup');
const app = express();
app.use(cors());

const l=( async (req, res) => {
    const {email,password}=req.body;
    const register = new lRegister({
        email : req.body.email,
        password: req.body.password,
    });
    

     User.findOne({email},(err, user)=>{
if(err){
    return res.status(500).send("error")
}
if(user){
        
        res.send({data:"user already exists",status:400})
}
else {
    register.save().then((register)=>{
        res.send({data:"success login", status:200})
    })
   
    }
     })
         
    

 
    
    
})
module.exports = l;