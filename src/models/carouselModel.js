const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  id: {
    type: String, 
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
