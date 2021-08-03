const connection = require('./DBConnet');

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
      // console.log(rawRecord)
      Record = JSON.stringify(rawRecord);
      const updateStr = 'UPDATE bridge_data SET RECORD = ? WHERE BRIDGE_ID = ?';
      connect.query(updateStr,[`${Record}`,`${id}`]);
      res.status(200).send('success');
  })
}

exports.deleteRecord = (req, res) => {
  const index = req.body[0]
  console.log(index);
  if (index === null || index === '') {
    res.status(406).send("Index is null");
    return;
  }
  const params = req.params.id;
  const id = '\#'+params;
  const queryStr = 'SELECT * FROM bridge_data WHERE BRIDGE_ID = ?';
  const connect = connection.createConnection();
  connect.query(queryStr, [`${id}`], (err, rows) =>{
    if (err) {
      console.log(err);
      return;
    }
    let rawRecord = JSON.parse(rows[0].RECORD);
    for (let i = 0; i < rawRecord.length; i++) {
      if( i == index) {
        rawRecord.splice(i,1);
      }
    }
    const newRecord = JSON.stringify(rawRecord);
    const updateStr = 'UPDATE bridge_data SET RECORD = ? WHERE BRIDGE_ID = ?';
    connect.query(updateStr,[`${newRecord}`,`${id}`]);
    res.status(200).send('success');
    return;
  })
}

exports.addBridge = (req, res) => {
  const location = req.body.data[0];
  const bridge_id = req.body.data[1];
  const initRecord = '[]';
  if (location === '' || bridge_id === '') {
    res.status(406).send('fail');
    return;
  }
  const queryStr = 'INSERT INTO bridge_data(LOCATION, BRIDGE_ID, RECORD) VALUES(?, ?, ?)';
  const connect = connection.createConnection();
  connect.query(queryStr, [`${location}`,`${bridge_id}`,`${initRecord}`]);
  res.status(200).send('success');
  return;
}

exports.deleteBridge = (req, res) => {
  const id = req.body[0]
  if (id === null || id === '') {
    res.status(406);
    return;
  }
  const queryStr = 'DELETE FROM bridge_data WHERE id = ?'
  const connect = connection.createConnection();
  connect.query(queryStr, [`${id}`], (error) => {
    if (error) {
      console.log(error);
    }
  });
  res.status(200).send();
  return;
}