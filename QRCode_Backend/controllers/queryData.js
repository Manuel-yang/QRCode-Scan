let connection = require('./DBConnet');


exports.queryData = function (req, res) {
  connect = connection.createConnection(); 
  console.log("Database connect success!");
  let selectStr = 'SELECT * FROM bridge_data';
  let countStr = 'SELECT COUNT(*) AS rowCount FROM bridge_data';
  let rowCount;
  connect.query(countStr, (err, row, fields) => {
    if (err) throw err;
    rowCount = parseInt(row[0].rowCount);
  })

  connect.query(selectStr, (err, row, fields) => {
    if (err) throw err;
    let data = [];
    let bridge_data;
    for (let i = 0; i < rowCount; i++)
    {
      bridge_data = { id: row[i].id, location: row[i].LOCATION, maintain_time: row[i].MAINTAIN_TIME};
      data.push(bridge_data);
    }
    data = JSON.stringify(data);
    console.log(data);
    res.send(data);
  })

} 
