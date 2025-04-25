const express = require('express');
const router = express.Router();
const destinospopularesController = require('../controllers/destinospopularesController');

router.get('/', destinospopularesController.getAllDestinosPopulares);
router.get('/:id', destinospopularesController.getDestinoPopularById);
router.post('/', destinospopularesController.createDestinoPopular);
router.delete('/:id', destinospopularesController.deleteDestinoPopular);

module.exports = router;