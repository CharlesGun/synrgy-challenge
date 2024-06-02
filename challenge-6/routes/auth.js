const express = require('express');
const { register, login, refreshToken, logout, whoAmI } = require('../controllers/auth');
const {isLogin}= require('../middleware/verifyToken')
const auth = express.Router();

auth.post('/register', register);
auth.post('/login', login);
auth.get('/token', refreshToken);
auth.delete('/logout', logout);
auth.get('/whoami', isLogin, whoAmI);

module.exports = auth;