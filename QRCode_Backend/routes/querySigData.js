const express = require('express');
const router = express.Router();
const connection = require('../controllers/DBConnet');

router.get('/:id', (req, res) => {
  const connect = connection.createConnection();
  const params = req.params.id;
  const data = '\#'+params
  const queryStr = 'SELECT * FROM bridge_data WHERE BRIDGE_ID = ?';
  connect.query(queryStr, [`${data}`], (err,rows) => {
    if (err) {
      console.log(err);
    }
    res.send(rows)
    return rows;
  })
});

module.exports = router;
