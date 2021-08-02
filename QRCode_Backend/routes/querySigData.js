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
    if (rows[0].RECORD === null) {
      return;
    }
    const count = JSON.parse(rows[0].RECORD).length;
    rows[0]['COUNT']=count;
    console.log(rows[0])
    res.send(rows)
    return rows;
  })
});

module.exports = router;
