const express = require('express');
const router = express.Router();
const connect = require('../controllers/queryAllData')

router.get('/', connect.queryAllData);

module.exports = router;