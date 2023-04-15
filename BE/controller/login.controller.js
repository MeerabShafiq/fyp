
const express = require('express');
const cors = require('cors');
const login = require('../models/login.model')
const app = express();
app.use(cors());

exports.login = async (req,res,next)=>{

    
    const isValid= await login.find(({email,password})=>{
         email===req.body.email && password===req.body.password
        
    })

   console.log(isValid)
    if(!isValid){
        res.send({data:"not valid user ",status:404})
    }
    if
        (isValid)
        {
            res.send({data:"valid and login", status:200})
                        
        }
    

    //   isValid.save().then((result)=>{
    //     if (result) {
    //         res.json({ message: "registered successfully" });
    //     }
    //     })

}



// const l=( async (req, res) => {
//     const {email,password}=req.body;
//     const register = new lRegister({
//         email : req.body.email,
//         password: req.body.password,
//     });
    

//      User.findOne({email},(err, user)=>{
// if(err){
//      res.status(500).send("error")
// }
// if(!user){
//     res.send({data:"user not found", status:404})
// }
// if(user){
        
//         res.send({data:"user already exists",status:400})
// }
         
//     register.save().then((register)=>{
//         res.send({data:"success login", status:200})
//         next();
//     })
   
    
//      })
         
    

 
    
    
// })
