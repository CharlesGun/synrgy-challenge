const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')

router.get('/orders-list', controllers.orders.getOrderList);
router.get('/get-all-order', controllers.orders.getAllOrder);
router.get('/cars-list', controllers.orders.getCarList);
router.get('/get-all-car', controllers.orders.getAllCar);
router.post('/create-order', controllers.orders.create);

module.exports = router;