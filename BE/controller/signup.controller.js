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
  await Register.find({ email, firstName, lastName })
    .then((result) => {
      if (result.length) {
        if (result == Register.firstName || result == Register.lastName || result == Register.email) {
          res.send({ data: 'user alerady exits' });
        } else {
          res.json({ message: 'alreaday there' });
        }
      } else {
        register.save().then((result) => {
          if (result) {
            res.json({ message: 'success' });
          }
        });
      }
    })
    .catch((err) => {
      res.send({ data: 'failed' });
    });
};
