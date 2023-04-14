const lRegister = require('../models/login');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const l=( async (req, res) => {
    const {email,password}=req.body;
    const register = new lRegister({
        email : req.body.email,
        password: req.body.password,
    });
    
    if(!email===lRegister.email && !password===lRegister.password){
        console.log(req.body.email , req.body.password)
        await register
    .save()
    .then((register) => {
      res.send({ data: 'success login', status: 200 });
    })
    .catch((err) => {
      console.log(err);
      next();
    });
   
    }
    
    else{
          res.send({data:'email already registered', status: 404})

    }
    
})
module.exports = l;