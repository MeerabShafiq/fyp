// const mongoose = require('mongoose');


// const login = new mongoose.Schema({
//      email:
//      { type: String, 
//        unique: true,
//        required: true
//      },
//      password: {   
//         type: String,
//         required: true
    
//     }

// },
// {
//     collection:"Login",
// }
// );
// const Login = mongoose.model("login", login);
// module.exports = Login;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
