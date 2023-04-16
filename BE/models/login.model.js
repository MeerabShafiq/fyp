const mongoose = require('mongoose');


const login = new mongoose.Schema({
     email:
     { type: String, 
       unique: true,
       required: true
     },
     password: {   
        type: String,
        required: true
    
    }

},
{
    collection:"Login",
}
);
const Login = mongoose.model("login", login);
module.exports = Login;