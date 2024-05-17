const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')
const multer = require('../middlewares/multer');
const auth = require('../middlewares/auth')

router.post('/', multer.image('uploads').single('image'), controllers.cars.create);
router.get('/form', controllers.cars.form);
router.get('/', controllers.cars.getAll);
router.get('/list', controllers.cars.showAll);
router.get('/form/:id/edit', controllers.cars.editForm);
router.put('/edit/:id', multer.image('uploads').single('image'), controllers.cars.update);
router.delete('/:id', controllers.cars.delete);
router.get('/detail/:id', controllers.cars.getOne);

module.exports = router;