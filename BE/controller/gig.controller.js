const CreateGig = require('../models/createGig.model');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());


 mongoose.connect('mongodb+srv://root2hack:11223344@cluster0.qddtl14.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});




exports.create = async (req, res) => {
  try {
    // Create a new Gig instance with the Cloudinary image URL
    const gig = new CreateGig({
      userId: req.body.userId,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.image
    });

    // Save the gig to MongoDB
    await gig.save().then((result) => {
      if (result) {
         // Return a success response
    res.status(200).send('Gig saved successfully');
      }
    }).catch(err=>res.status(400).send('Error uploading image or saving gig to database', err));

   
  } catch (err) {
    // Handle any errors that occur during the upload or save process
    console.error(err);
    res.status(400).send('Error uploading image or saving gig to database', err);
  }
};

exports.get = async (req, res) => {
  const userId = req.params.id||'';
  try {
    if(userId){
      const gigs = await CreateGig.find({ userId });
      res.send({success:true, results:gigs})
      // res.json(gigs)
    }
    else{
    const gigs = await CreateGig.find({});
    res.json({success:true, results:gigs});
  }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving products');
  }
};

