const express = require('express');
const DBOpt  = require('../controllers/DBOpt');
const router = express.Router();

router.post('/addBridge', DBOpt.addBridge);
router.post('/:id/deleteRecord', DBOpt.deleteRecord);
router.post('/:id', DBOpt.addRecord);

module.exports = router;