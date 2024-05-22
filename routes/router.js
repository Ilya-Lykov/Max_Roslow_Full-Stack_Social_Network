const express = require('express');
const router = express.Router();
const UserRouter = require('../src/users/user.router');

router.use('/', UserRouter);

module.exports = router;
