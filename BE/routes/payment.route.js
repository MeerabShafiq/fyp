const express = require("express");
const router = express.Router();

const paymentcontroller = require('../controller/payment.controller')

router.post('/payment',paymentcontroller.PaymentCheck)

module.exports = router