const express = require('express');
const router = express.Router();
const users = require('./users');
const cars = require('./cars');
const orders = require('./orders');

router.use('/users', users);
router.use('/cars', cars);
router.use('/dashboard', orders);

module.exports = router;
