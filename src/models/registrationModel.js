const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  registrationDetails: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.models.Registration || mongoose.model("Registration", registrationSchema);
