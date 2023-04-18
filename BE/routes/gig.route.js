const express = require("express");
const router = express.Router();

const GigController = require('../controller/gig.controller')




router.post("/create-gig", GigController.create)
router.get("/gigs", GigController.get)
router.get("/gigs/:id", GigController.get)

module.exports = router;
