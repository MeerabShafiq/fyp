const express = require("express");
const router = express.Router();

const stripController = require('../controller/strip.controller')




router.post("/create-payment-intent", stripController.strip)

module.exports = router;