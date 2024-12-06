const express = require("express");

const {fetchRegistrations, createRegistration} = require('../controllers/registrationControllers')

const router = express.Router()

router.get("/", fetchRegistrations)
router.post("/", createRegistration)


module.exports = router;

