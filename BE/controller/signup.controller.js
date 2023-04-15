const Register = require('../models/signup.model');
const express = require('express');
const  User  = require('../models/login.model.');
const cors = require('cors');
const app = express();
app.use(cors());

const M=(async (req, res) => {
    console.log(req);
    
    const { firstName, lastName, email, password, confrimPassword } = req.body;
    const register = new Register({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confrimPassword: req.body.confrimPassword,
  
    });
       const user = await User.findOne({email},(err)=>{
   
        if(err){
          res.status(500).send("error")
        }
       
        if(user){
          res.send({data:"user already exists",status:"200"})
        res.send(user)
        }
        else {
          res.send({data:"not"})
        }
        console.log(user)

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

 
  });
  module.exports = M;