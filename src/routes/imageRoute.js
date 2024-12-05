const express = require("express")
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public'); // Directory where files will be saved
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    },
});

const upload = multer({ storage: storage });

const router = express.Router()

const { uploadImage } = require('../controllers/imageController');

// Route definition
router.post('/', upload.single('file'), uploadImage);

module.exports = router;
