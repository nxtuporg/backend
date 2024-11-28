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

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Retrieve a list of images
 *     description: Fetch all images from the database with their ID, alt text, URL, and link.
 *     responses:
 *       200:
 *         description: A list of images.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique ID of the image.
 *                   alt:
 *                     type: string
 *                     description: The alt text for the image.
 *                   url:
 *                     type: string
 *                     description: The URL where the image is stored.
 *                   link:
 *                     type: string
 *                     description: The link associated with the image.
 *       500:
 *         description: Internal server error.
 */


const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
