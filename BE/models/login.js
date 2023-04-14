const mongoose = require('mongoose');


const login = new mongoose.Schema({
     email:{ type: String, unique: true},
     password: String,

},
{
    collection:"login",
}
);
const loginRegister=mongoose.model("login", login);
module.exports = loginRegister;