const express = require('express');
const UserRouter = express.Router();
const UserController = require('./users.controller');
const authenticateToken = require('./users.middleware');
/* GET home page. */

UserRouter.post('/login', UserController.login);
UserRouter.post('/register', UserController.register);
UserRouter.get('/current', authenticateToken, UserController.current);
UserRouter.get('/user/:id', authenticateToken, UserController.getUser);
UserRouter.put('/user/:id', authenticateToken, UserController.updateUser);

module.exports = UserRouter;