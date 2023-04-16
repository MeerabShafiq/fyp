
const express = require('express');
const cors = require('cors');
const Login = require('../models/login.model')
const app = express();
app.use(cors());

exports.login = async (req,res,next)=>{
   const email = req.body.email;
    await Login.findOne({email}).then(data=>{
          if(data.length){
          
            res.json({
                
                status:"success",
                message:"login success",
                data:data
            })
            
          } 
         
          else {
            console.log(data)
            res.json({
                status:"failed",
                message:"error occured druing verification"
            })
        }  

    })
    .catch(error=>{
        res.json({
            status:"Failed",
            message:"error occured"
        })
       

    })
} 
 


         
    

 
    

