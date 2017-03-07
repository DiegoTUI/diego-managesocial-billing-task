'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./controller');

// add the methods from the controller
router.get('/', controller.getCharges);
router.post('/', controller.performCharge);

module.exports = router;
