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


exports.create = async (req, res) => {
    upload.single('image')(req, res, function (err) {
        if (err) {
          // Handle the error if the file upload fails
          console.error(err);
          return res.status(400).send('Error uploading file');
        }
    
        // Create a new Image instance with the file data
        const image = new CreateGig({
          title: req.body.title,
          price: req.body.price,
          description: req.body.description,
          name: req.file.originalname,
          data: req.file.buffer,
          contentType: req.file.mimetype,
        });
    
        // Save the image to MongoDB
        image.save(function (err) {
          if (err) {
            // Handle the error if the image save fails
            console.error(err);
            return res.status(400).send('Error saving image to database');
          }
    
          // Return a success response
          res.status(200).send('Image saved successfully');
        });
      });
};
exports.get = async (req, res) => {
  const userId = req.params.id||'';
  try {
    if(userId){
      const gigs = await CreateGig.find({ userId });
      res.status(200).send.json({success:true, results:gigs})
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
    res.json(gigsWithUrls);
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