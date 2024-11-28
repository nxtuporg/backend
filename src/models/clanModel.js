const mongoose = require('mongoose');

const clanSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  head: {
    type: String,
    required: true,
  },
  subHead: {
    type: String,
    required: false, 
  },
  score: {
    type: Number,
    default: 0,
  },
  members: {
    type: [
      {
        memberEnrollment: { type: String, required: true }, 
        name: { type: String, required: true },
        role: { type: String, required: true },
        email: { type:String, required: true }
      },
    ],
    default: [], 
  },
}, {
  timestamps: true 
});

const Clan = mongoose.model('Clan', clanSchema);

module.exports = Clan;
