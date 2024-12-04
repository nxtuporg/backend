const express = require("express");

const {fetchClans} = require('../controllers/clanControllers')

const {addClan} = require('../controllers/clanControllers')

const {updateClan} = require('../controllers/clanControllers')

const router = express.Router()

/**
 * @swagger
 * /api/clans:
 *   get:
 *     summary: Retrieve a list of clans
 *     description: Fetch all clans from the database.
 *     responses:
 *       200:
 *         description: A list of clans.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The clan ID.
 *                   name:
 *                     type: string
 *                     description: The clan name.
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The clan date.
 *       500:
 *         description: Internal server error.
 */
router.get('/', fetchClans)
router.post('/', addClan)
router.patch('/', updateClan)
router.delete('/')
 
module.exports = router;