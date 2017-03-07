'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./controller');

// add the methods from the controller
router.post('/', controller.createCustomer);

module.exports = router;
