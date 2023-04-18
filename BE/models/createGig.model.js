const mongoose = require('mongoose');

const createGig = new mongoose.Schema(
  {
    userId:Number,
    title:String,
    price:Number,
    description:String,
    name: String,
    data: Buffer,
    contentType: String,
  },
  {
    collection: 'Gigs',
  }
);
const CreateGig = mongoose.model('createGig', createGig);
module.exports = CreateGig;
