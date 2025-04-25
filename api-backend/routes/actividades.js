const express = require('express');
const router = express.Router();
const actividadesController = require('../controllers/actividadesController');

router.get('/', actividadesController.getAllActividades);
router.get('/:id', actividadesController.getActividadById);
router.post('/', actividadesController.createActividad);
router.delete('/:id', actividadesController.deleteActividad);

module.exports = router;