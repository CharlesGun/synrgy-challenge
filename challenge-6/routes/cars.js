const express = require('express');
const {getCars, getCarById, createCar, updateCar, deleteCar} = require('../controllers/cars.js');
const { isLogin, isAdmin } = require('../middleware/verifyToken.js');
const { image } = require('../middleware/multer.js');
const cars = express.Router();

cars.get('/', isLogin, getCars);
cars.get('/:id', isLogin, getCarById);
cars.post('/', isAdmin, image('uploads').single('image'), createCar);
cars.put('/:id', isAdmin, image('uploads').single('image'), updateCar);
cars.delete('/:id', isAdmin, deleteCar);

module.exports = cars;