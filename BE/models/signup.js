const mongoose = require('mongoose');


const signup = new mongoose.Schema({
     fname: String,
     lname: String,
     email:{ type: String, unique: true},
     Password: String,
     Conformpassword: String,

},
{
    collection:"Register",
}
);
const Register=mongoose.model("signup", signup);
module.exports = Register;