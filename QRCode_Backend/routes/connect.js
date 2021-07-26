let express = require('express');
let router = express.Router();
let connect = require('../controllers/queryAllData')

router.get('/', connect.queryAllData);

module.exports = router;