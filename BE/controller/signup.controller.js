const Register = require('../models/signup.model');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

exports.signup =async (req, res) => {
    const { firstName, lastName, email, password, confrimPassword } = req.body;
    const register = new Register({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confrimPassword: req.body.confrimPassword,
  
    });
       await Register.find({email,firstName,lastName}).then(result=>{
        if(result.length){
          console.log(email,firstName,lastName)
          if(result==Register.firstName || result==Register.lastName || result==Register.email){
          res.send({data:"user alerady exits"})
          }
          else{
            res.json({message:"alreaday there"})
          }
        }
        else{
          register.save().then((result)=>{
            if(result){
              res.json({message:"success"})
            }
          });
          
        
        
        }

      }).catch(err=>{
        res.send({data:"failed"})
      })
    




// User.findOne({firstName,lastName,email},(err,user)=>{
//   if(err)
//   {
//     res.status(500).send("error")
//   }
//   res.send(user)
//   if(user)
// {
//   res.send({data:"user already exists",status:400})
// }
//  else {
//    register
//   .save()
//   .then((register) => {
//     res.send({ data: 'success signup', status: 200 });
//   })
//  }
  
  
  
  
//  })

 
  };