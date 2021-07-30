const express = require('express');
const router = express.Router();
const connection = require('../controllers/DBConnet');

router.get('/:id', (req, res) => {
  let connect = connection.createConnection();
  let params = req.params.id;
  let data = '\#'+params
  let queryStr = 'SELECT * FROM bridge_data WHERE BRIDGE_ID = ?';
  connect.query(queryStr, [`${data}`], (err,rows) => {
    if (err) {
      console.log(err);
    }
    res.send(rows)
    return rows;
  })
});

module.exports = router;
