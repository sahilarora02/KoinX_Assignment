const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');
const multer = require('multer'); 
const upload = multer({ dest: 'uploads/' }); 

router.post('/upload', upload.single('file'), tradeController.uploadCsvFile);
router.post('/balance', tradeController.getAssetBalance);
module.exports = router;