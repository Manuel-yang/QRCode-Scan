const express = require('express');
const addRecord  = require('../controllers/addRecord');
const router = express.Router();

router.post('/:id', addRecord.addRecord);

module.exports = router;