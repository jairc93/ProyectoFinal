const express = require('express');
const router = express.Router();
const galeriaController = require('../controllers/galeriaController');

router.get('/', galeriaController.getAllImagenes);
router.get('/:id', galeriaController.getImageById);

module.exports = router;