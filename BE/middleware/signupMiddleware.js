const Register = require('../models/signup');
const express = require('express');
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
    await register
      .save()
      .then((register) => {
        res.send({ data: 'success signup', status: 200 });
      })
      .catch((err) => {
        console.log(err);
        next();
      });
  });
  module.exports = M;