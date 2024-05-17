const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')

router.post('/register', controllers.users.register);
router.post('/login', controllers.users.login);

module.exports = router;