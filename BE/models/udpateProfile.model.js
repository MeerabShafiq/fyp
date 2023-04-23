const mongoose = require('mongoose');

const Profile = new mongoose.Schema(
  {
    userId: Number,
    instituteName: String,
    degreeName: String,
    dateFromEd: Date,
    dateToEd: Date,
    industryName: String,
    dateFromInd: Date,
    dateToInd: Date,
    description: String,
  },
  {
    collation: 'UpdateProfile',
  }
);
const Profiles = mongoose.model('updateProfile', Profile);
module.exports = Profiles;
