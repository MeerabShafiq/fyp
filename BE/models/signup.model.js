const mongoose = require('mongoose');


const signup = new mongoose.Schema({
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
     confrimPassword: {   
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