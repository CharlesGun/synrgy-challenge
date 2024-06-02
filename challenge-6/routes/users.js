const express = require('express');
const {getUsers, createUser, getUserById, updateUser, deleteUser} = require('../controllers/users.js');
const { isAdmin } = require('../middleware/verifyToken.js');

const users = express.Router();

users.get('/', isAdmin, getUsers);
users.get('/:id', isAdmin, getUserById);
users.post('/', isAdmin, createUser);
users.put('/:id', isAdmin, updateUser);
users.delete('/:id', isAdmin, deleteUser);



module.exports = users;