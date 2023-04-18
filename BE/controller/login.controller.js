const Register = require('../models/signup.model');
const User = require('../models/login.model');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    // Check token
    if (req.body?.token) {
      const user = await User.findOne({ token: req.body.token });
      if (user) {
        res.status(200).json({ userId: user.userId, token: user.token, email: user.email, success: true });
      } else {
        res.status(404).json({ success: false, message: 'Authentication failed. Token expired' });
      }
    } else {
      // Check if email exists in database
      const user = await Register.findOne({ email: req.body.email });

      if (!user) {
        return res.status(401).json({ message: 'Authentication failed. Email not found.' });
      }

      // Check if password is correct
      if (user.password !== req.body.password) {
        return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      }
      const token = jwt.sign({ userId: user._id }, 'secretkey');
      const login = new User({ userId: req.body.userId, token: token, email: req.body.email });

      login.save().then((result) => {
        if (result) {
          res.status(200).json({ userId: user.userId, token: token, email: user.email, success: true });
        }
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
