const mongoose = require('mongoose');


const signup = new mongoose.Schema({
    userId: 
    {    type: Number,
        required: true,
        unique : true
    },
    firstName: 
    {    type: String,
        required: true
    },
    lastName:
    {   type: String,
        required: true
    },
     email:{   
        type: String,
        required: true,
        unique : true
    },
     password: {   
        type: String,
        required: true
    },
     confirmPassword: {   
        type: String,
        required: true
    }

},
{
    collection:"Register",
}
);
const Register=mongoose.model("signup", signup);
module.exports = Register;