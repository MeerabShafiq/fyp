const Register = require('../models/signup.model');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

exports.signup = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const users = await Register.find({});
  const register = new Register({
    userId: users.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  await Register.findOne({ email })
  .then((result) => {
    console.log(result, register);
    if (result) {
      if (result.firstName == register.firstName || result.lastName == register.lastName || result.email == register.email) {
        res.status(409).json({ data: 'Email already exists' });
      } else {
        res.status(409).json({ message: 'already there' });
      }
    } else {
      register.save().then((result) => {
        if (result) {
          res.status(200).json({ message: 'success' });
        } else {
          res.status(404).json({ message: 'Try again' });
        }
      });
    }
  })
  .catch((err) => {
    res.send({ data: 'failed' });
  });

};
