const express = require('express');
const router = express.Router();
const UserRouter = require('../src/users/users.router');

router.use('/', UserRouter);

module.exports = router;
