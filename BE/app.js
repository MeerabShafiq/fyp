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
const stripe = require('stripe')('sk_test_51My2lUGtwtMhoEnmfcTfmrr8whC3sU6G07lscUl0a6g9fTDZX0ClMzZD6d4wGzSS4g4bPulIPyJZhKcO56x0XWJ00N4bVIpiN');
const updateProfile = require('./routes/updateProfile.js')
const Payment = require('./routes/payment.route.js')

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
