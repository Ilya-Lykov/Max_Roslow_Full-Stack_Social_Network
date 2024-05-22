const express = require('express');
const UserRouter = express.Router();
const UserController = require('./users.controller');

/* GET home page. */

UserRouter.post('/login', UserController.login);
UserRouter.post('/register', UserController.register);
UserRouter.get('/current', UserController.current);
UserRouter.get('/user/:id', UserController.getUser);
UserRouter.put('/user/:id', UserController.login);

module.exports = UserRouter;