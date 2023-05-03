const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//Routes
const loginRoute = require('./routes/login.route.js');
const signupRoute = require('./routes/signup.route');
const stripRoute = require('./routes/strip.route.js');
const gigRoute = require('./routes/gig.route.js');
const buyer = require('./routes/login.route.js')
const app = express();
const updateProfile = require('./routes/updateProfile.js')
const Payment = require('./routes/payment.route.js')
const cloudinary = require('cloudinary').v2;

app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.listen(4000, () => {
  console.log('server started');
});

mongoose.connect('mongodb+srv://root2hack:11223344@cluster0.qddtl14.mongodb.net/test', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on("error", console.error.bind(console, 'connection error: '))
db.once("open", () => {
  console.log('Connected Successfully')
})
// Configuration 
cloudinary.config({
  cloud_name: "dmaqbrci3",
  api_key: "892285218522175",
  api_secret: "dEA5TjoVS2s62QV3XXSoH1gkArA"
});

//signup middleware
app.use('/', signupRoute);
//login middleware
app.use('/', loginRoute);
//signup middleware
app.use('/', stripRoute);
//gig middleware
app.use('/', gigRoute);

app.use('/',buyer)

app.use('/',updateProfile)

app.use('/',Payment)