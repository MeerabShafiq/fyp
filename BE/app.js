const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Register = require('./models/signup.model');
const login = require('./models/login.model');
const CreateGig = require('./models/createGig.model');
const multer = require('multer');
const Grid = require('gridfs-stream');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(express.json());
app.use(cors());
const loginRoute = require("./routes/login.route.js");
const signupRoute = require('./routes/signup.route')
const stripRoute = require('./routes/strip.route.js')

// Create a Multer storage instance
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
// mongoose.set('strictQuery', false);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.listen(4000, () => {
  console.log('server started');
});

const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

const JWT_SECRET = 'hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe';

const mongoUrl = 'mongodb+srv://root2hack:11223344@cluster0.qddtl14.mongodb.net/test';
mongoose.set('strictQuery', true),
  mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to database');
    })
    .catch((e) => console.log(e));

// require("./userDetails");
// require("./imageDetails");

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//login middleware
app.use("/",loginRoute);
//signup middleware
app.use("/",signupRoute)
//signup middleware
app.use("/",stripRoute)











app.post('/create-gig', async (req, res) => {
  console.log(req);
  // Use the Multer upload instance to handle the file upload
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
});

app.get('/gigs', async (req, res) => {
  try {
    const gigs = await CreateGig.find();
    const files = await gfs.files.find().toArray();
    const fileUrls = files.map((file) => `/gigs/${file.filename}`);

    const gigsWithUrls = gigs.map((gig) => {
      const file = files.find((f) => f.metadata.gigId.toString() === gig._id.toString());
      const url = file ? `/gigs/${file.filename}` : null;
      return { ...gig._doc, imageUrl: url };
    });

    res.json(gigsWithUrls);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving products');
  }
});

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




// app.post("/register", async (req, res) => {
//   const { fname, lname, email, password, userType } = req.body;

//   const encryptedPassword = await bcrypt.hash(password, 10);
//   try {
//     const oldUser = await User.findOne({ email });

//     if (oldUser) {
//       return res.json({ error: "User Exists" });
//     }
//     await User.create({
//       fname,
//       lname,
//       email,
//       password: encryptedPassword,
//       userType,
//     });
//     res.send({ status: "ok" });
//   } catch (error) {
//     res.send({ status: "error" });
//   }
// });

// app.post("/login-user", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.json({ error: "User Not found" });
//   }
//   if (await bcrypt.compare(password, user.password)) {
//     const token = jwt.sign({ email: user.email }, JWT_SECRET, {
//       expiresIn: "15m",
//     });

//     if (res.status(201)) {
//       return res.json({ status: "ok", data: token });
//     } else {
//       return res.json({ error: "error" });
//     }
//   }
//   res.json({ status: "error", error: "InvAlid Password" });
// });

// app.post("/userData", async (req, res) => {
//   const { token } = req.body;
//   try {
//     const user = jwt.verify(token, JWT_SECRET, (err, res) => {
//       if (err) {
//         return "token expired";
//       }
//       return res;
//     });
//     console.log(user);
//     if (user == "token expired") {
//       return res.send({ status: "error", data: "token expired" });
//     }

//     const useremail = user.email;
//     User.findOne({ email: useremail })
//       .then((data) => {
//         res.send({ status: "ok", data: data });
//       })
//       .catch((error) => {
//         res.send({ status: "error", data: error });
//       });
//   } catch (error) { }
// });

// app.listen(5000, () => {
//   console.log("Server Started");
// });

// app.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;
//   try {
//     const oldUser = await User.findOne({ email });
//     if (!oldUser) {
//       return res.json({ status: "User Not Exists!!" });
//     }
//     const secret = JWT_SECRET + oldUser.password;
//     const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
//       expiresIn: "5m",
//     });
//     const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "adarsh438tcsckandivali@gmail.com",
//         pass: "rmdklolcsmswvyfw",
//       },
//     });

//     var mailOptions = {
//       from: "youremail@gmail.com",
//       to: "thedebugarena@gmail.com",
//       subject: "Password Reset",
//       text: link,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent: " + info.response);
//       }
//     });
//     console.log(link);
//   } catch (error) { }
// });

// app.get("/reset-password/:id/:token", async (req, res) => {
//   const { id, token } = req.params;
//   console.log(req.params);
//   const oldUser = await User.findOne({ _id: id });
//   if (!oldUser) {
//     return res.json({ status: "User Not Exists!!" });
//   }
//   const secret = JWT_SECRET + oldUser.password;
//   try {
//     const verify = jwt.verify(token, secret);
//     res.render("index", { email: verify.email, status: "Not Verified" });
//   } catch (error) {
//     console.log(error);
//     res.send("Not Verified");
//   }
// });

// app.post("/reset-password/:id/:token", async (req, res) => {
//   const { id, token } = req.params;
//   const { password } = req.body;

//   const oldUser = await User.findOne({ _id: id });
//   if (!oldUser) {
//     return res.json({ status: "User Not Exists!!" });
//   }
//   const secret = JWT_SECRET + oldUser.password;
//   try {
//     const verify = jwt.verify(token, secret);
//     const encryptedPassword = await bcrypt.hash(password, 10);
//     await User.updateOne(
//       {
//         _id: id,
//       },
//       {
//         $set: {
//           password: encryptedPassword,
//         },
//       }
//     );

//     res.render("index", { email: verify.email, status: "verified" });
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "Something Went Wrong" });
//   }
// });

// app.get("/getAllUser", async (req, res) => {
//   try {
//     const allUser = await User.find({});
//     res.send({ status: "ok", data: allUser });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/deleteUser", async (req, res) => {
//   const { userid } = req.body;
//   try {
//     User.deleteOne({ _id: userid }, function (err, res) {
//       console.log(err);
//     });
//     res.send({ status: "Ok", data: "Deleted" });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/upload-image", async (req, res) => {
//   const { base64 } = req.body;
//   try {
//     await Images.create({ image: base64 });
//     res.send({ Status: "ok" })

//   } catch (error) {
//     res.send({ Status: "error", data: error });

//   }
// })

// app.get("/get-image", async (req, res) => {
//   try {
//     await Images.find({}).then(data => {
//       res.send({ status: "ok", data: data })
//     })

//   } catch (error) {

//   }
// })

// app.get("/paginatedUsers", async (req, res) => {
//   const allUser = await User.find({});
//   const page = parseInt(req.query.page)
//   const limit = parseInt(req.query.limit)

//   const startIndex = (page - 1) * limit
//   const lastIndex = (page) * limit

//   const results = {}
//   results.totalUser=allUser.length;
//   results.pageCount=Math.ceil(allUser.length/limit);

//   if (lastIndex < allUser.length) {
//     results.next = {
//       page: page + 1,
//     }
//   }
//   if (startIndex > 0) {
//     results.prev = {
//       page: page - 1,
//     }
//   }
//   results.result = allUser.slice(startIndex, lastIndex);
//   res.json(results)
// })
