const mongoose = require('mongoose');

const profile = new mongoose.Schema(
  {
    userId: Number,
    instituteName: String,
    degreeName: String,
    dateFromEd: String,
    dateToEd: String,
    industryName: String,
    dateFromInd: String,
    dateToInd: String,
    description: String,
  },
  {
    collation: { locale: 'en_US', strength: 1 },
  }
);
const Profile = mongoose.model('profile', profile);
module.exports = Profile;
