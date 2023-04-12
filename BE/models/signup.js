const mongoose = require('mongoose');


const signup = new mongoose.Schema({
    firstName: String,
    lastName: String,
     email:{ type: String, unique: true},
     password: String,
     confrimPassword: String,

},
{
    collection:"Register",
}
);
const Register=mongoose.model("signup", signup);
module.exports = Register;