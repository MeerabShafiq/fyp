const Register = require('../models/signup.model');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const secret = 'mysecret';
  // Assuming req.body.token contains the JWT string
  const token = req.body.token;

  try {
    // Check token
    if (req.body?.token) {
      // Verify the token and decode its payload
      jwt.verify(token, secret, async (err, decodedDetails) => {
        if (err) {
          // Token verification failed
          console.error('Token verification failed:', err.message);
          res.status(404).json({ success: false, message: 'Token verification failed:' });
          // Handle the error
        } else {
          // Token verification succeeded
          console.log('Token verified:', decodedDetails);
          if (decodedDetails.userId) {
            const user = (await Register.findOne({ userId: decodedDetails.userId }));
            if (user.password === decodedDetails.password)
              res.status(200).json({
                // decodedDetails,
                userId: decodedDetails.userId,
                token: decodedDetails.token,
                email: decodedDetails.email,
                success: true,
              });
            else {
              res.status(404).json({ success: false, message: 'token not valid' });
            }
          } else {
            res.status(200).json({ success: false, message: 'Authentication failed. Token expired'});
          }
          // Do something with the decoded payload
        }
      });
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
      const secret = 'mysecret';
      // Define the payload for the JWT token
      const payload = {
        userId: user.userId,
        email: user.email,
        password: user.password,
      };
      // Define the options for the JWT token
      const options = {
        expiresIn: '1h',
      };

      const token = jwt.sign(payload, secret, options);
      if (token)
        res.send({
          name: user.firstName + ' ' + user.lastName,
          userId: user.userId,
          token: token,
          email: req.body.email,
          success: true,
        });
      else {
        return res.status(401).json({ message: 'Some thing went wrong. Please try again.' });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
