let express = require('express');
let router = express.Router();
let connect = require('../controllers/queryData')

router.get('/', connect.queryData);

module.exports = router;