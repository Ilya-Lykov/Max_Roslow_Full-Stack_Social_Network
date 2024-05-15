const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers/index');

/* GET home page. */


router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/current', UserController.current);
router.get('/user/:id', UserController.getUser);
router.put('/user/:id', UserController.login);

module.exports = router;
