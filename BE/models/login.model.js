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
    collection:"login",
}
);
module.exports = new mongoose.model("login", login);
