const express = require("express");

const {fetchClans} = require('../controllers/clanControllers')

const router = express.Router()

/**
 * @swagger
 * /api/book/all:
 *   get:
 *     summary: Fetch all the clans
 *     tags: [Clans]
 *     responses:
 *       200:
 *         description: Successfully fetched all clans.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/clans'
 *       404:
 *         description: No books found with the provided filters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: No books found.
 *       500:
 *         description: Server error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: An error occurred while fetching books.
 */
router.get('/', fetchClans)

router.post('/')
router.patch('/')
router.delete('/')
 
module.exports = router;