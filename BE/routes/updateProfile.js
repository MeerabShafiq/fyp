const express = require("express");
const router = express.Router();

const updateProfile = require('../controller/updateProfile.controller')



router.post('/edit-profile' , updateProfile.updatePro)
router.get('/get-profile/:id' , updateProfile.getProfile)

module.exports = router;