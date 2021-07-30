const connection = require('../controllers/DBConnet');

exports.addRecord = (req, res) => {
  const data = req.body.newRecord;
  const name = data[0];
  const time = data[1];
  const date = data[2];
  const params = req.params.id;
  const id = '\#'+params;
  
  if (name == '' || time == '' || date == '') {
    console.log('wrong');
    res.status(406).send("wrong");
    return;
  }
  const queryStr = 'SELECT * FROM bridge_data WHERE BRIDGE_ID = ?';
  const connect = connection.createConnection();
  const newRecord = {"NAME": name, "TIME": time, "DATE": date};
  connect.query(queryStr, [`${id}`], (err,rows) => {
    if (err) {
      console.log(err);
    }
      let rawRecord = JSON.parse(rows[0].RECORD);
      rawRecord.push(newRecord);
      console.log(rawRecord)
      Record = JSON.stringify(rawRecord);
      const updateStr = 'UPDATE bridge_data SET RECORD = ? WHERE BRIDGE_ID = ?';
      connect.query(updateStr,[`${Record}`,`${id}`]);
      res.status(200).send('success');
  })
}