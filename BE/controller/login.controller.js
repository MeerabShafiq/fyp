
const express = require('express');
const cors = require('cors');
const login = require('../models/login.model')
const app = express();
app.use(cors());

exports.login = async (req,res,next)=>{

   
     await login.findOne({email: req.body.email}).then(result=>{
        if(result.length){
            res.send({data:"user already exixts"})
        }
        else{
            res.send({data:"can login"})
        }
     }).catch(err=>{
        res.send({status:"failed"})
     })

}




         
    

 
    

