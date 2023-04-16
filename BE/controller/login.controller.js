// const express = require('express');
// const cors = require('cors');
// const Login = require('../models/login.model')
// const app = express();
// app.use(cors());

// exports.login = async (req,res,next)=>{
//    const email = req.body.email;
//     await Login.findOne({email}).then(data=>{
//           if(data.length){

//             res.json({

//                 status:"success",
//                 message:"login success",
//                 data:data
//             })

//           }

//           else {
//             console.log(data)
//             res.json({
//                 status:"failed",
//                 message:"error occured druing verification"
//             })
//         }

//     })
//     .catch(error=>{
//         res.json({
//             status:"Failed",
//             message:"error occured"
//         })

//     })
// }
const Register = require('../models/signup.model');
const User = require('../models/login.model');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    // Check if email exists in database
    const user = await Register.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. Email not found.' });
    }

    // Check if password is correct
    if (user.password !== req.body.password) {
      return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
    }

    // Create token
    const token = jwt.sign({ userId: user._id }, 'secretkey');
const login = new User({userId: user._id, token: token, email: user.email, })
    // Save token to user document
    await login.save();
    console.log('Token saved to user:', login);
    // Send response with user data and token
    res.status(200).json({ userId: user._id, token: token, email: user.email, success:true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
