const CreateGig = require('../models/createGig.model');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const app = express();
app.use(cors());

const storage = multer.memoryStorage();
// Create a Multer upload instance
const upload = multer({ storage: storage });
 mongoose.connect('mongodb+srv://root2hack:11223344@cluster0.qddtl14.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const conn = mongoose.connection;
let gfs;

// create a GridFS storage engine and pass it to GridFS-Stream
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('createGig');
});
conn.on('error', console.error.bind(console, 'connection error:'));


const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
  cloud_name: "dmaqbrci3",
  api_key: "892285218522175",
  api_secret: "dEA5TjoVS2s62QV3XXSoH1gkArA"
});

exports.create = async (req, res) => {
  const file = req.image;
  console.log(req);
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(file);
    
    // Create a new Gig instance with the Cloudinary image URL
    const gig = new CreateGig({
      userId: req.body.userId,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      imageUrl: result.secure_url
    });

    // Save the gig to MongoDB
    await gig.save();

    // Return a success response
    res.status(200).send('Gig saved successfully');
  } catch (err) {
    // Handle any errors that occur during the upload or save process
    console.error(err);
    res.status(400).send('Error uploading image or saving gig to database');
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
    const gigs = await CreateGig.find();
    const files = await gfs.files.find().toArray();
    const fileUrls = files.map((file) => `/gigs/${file.filename}`);

    const gigsWithUrls = gigs.map((gig) => {
      const file = files.find((f) => f.metadata.gigId.toString() === gig.userId.toString());
      const url = file ? `/gigs/${file.filename}` : null;
      return { ...gig._doc, imageUrl: url };
    });
    res.json({success:true, results:gigsWithUrls});
  }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving products');
  }
};
// this route will retrieve the image file with the given filename
app.get('/gigs/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const readstream = gfs.createReadStream({ filename: filename });

    // Set the response content type to the image MIME type
    res.set('Content-Type', 'image/jpeg');

    // Pipe the GridFS stream to the response
    readstream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving products');
  }
});