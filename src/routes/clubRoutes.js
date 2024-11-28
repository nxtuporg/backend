const express = require("express");

const {fetchClubs} = require('../controllers/clubControllers')

const router = express.Router()

/**
 * @swagger
 * /api/clubs:
 *   get:
 *     summary: Retrieve a list of clubs
 *     description: Fetch all clubs from the database.
 *     responses:
 *       200:
 *         description: A list of clubs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The clubs ID.
 *                   name:
 *                     type: string
 *                     description: The clubs name.
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The clubs date.
 *       500:
 *         description: Internal server error.
 */
router.get('/', fetchClubs)
router.post('/')
router.patch('/')
router.delete('/')
 
module.exports = router;