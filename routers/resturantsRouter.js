// routes/resturantRoutes.js
const express = require('express');
const router = express.Router();
const resturantController = require('../controllers/resturantsController');

// Routes
router.get('/', resturantController.getAllResturants);
router.get('/:id', resturantController.getResturantById);
router.post('/', resturantController.createResturant);
router.put('/:id', resturantController.updateResturant);
router.delete('/:id', resturantController.deleteResturant);

module.exports = router;
