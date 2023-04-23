const mongoose = require('mongoose');

const updateProfile = new mongoose.Schema(
    {
        instituteName: String,
        degreeName : String,
        dateFromEd : Date,
        dateToEd : Date,
        industryName : String,
        dateFromInd : Date,
        dateToInd : Date,
        description : String,
    },
    {
        collation : 'UpdateProfile',
    }
);
const updateP = mongoose.model('updateProfile',updateProfile );
module.exports = updateP;