const express = require("express");

const {fetchCarousel} = require('../controllers/carouselControllers')

const {addCarousel} = require('../controllers/carouselControllers')

const {updateCarousel} = require('../controllers/carouselControllers')

const router = express.Router()

/**
 * @swagger
 * /api/carousel:
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


router.get('/', fetchCarousel)
router.post('/', addCarousel)
router.patch('/', updateCarousel)
router.delete('/')
 
module.exports = router;