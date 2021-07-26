let mysql = require('mysql');

function createConnection() {
  let connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'scan-qrcode'
});
return connection;
}
module.exports.createConnection = createConnection;