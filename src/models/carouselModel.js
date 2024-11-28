const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  id: {
    type: String, // You can also use Number if required
    required: true,
    unique: true
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
  }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
