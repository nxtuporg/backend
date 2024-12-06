const express = require("express");

const {fetchRegistrations} = require('../controllers/registrationControllers')

const router = express.Router()

router.get("/", fetchRegistrations)


module.exports = router;

