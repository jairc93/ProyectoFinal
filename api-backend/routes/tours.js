const express = require('express');
const router = express.Router();
const toursController = require('../controllers/toursController');

router.get('/', toursController.getAllTours);
router.get('/:id', toursController.getTourById);
router.post('/', toursController.createTour);
router.delete('/:id', toursController.deleteTour);

module.exports = router;