const express = require('express');
const users = require('./users.js');
const auth = require('./auth.js');
const cars = require('./cars.js');


const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/cars', cars);

module.exports = router;