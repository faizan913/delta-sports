const mysql = require('mysql');

const dbConn = mysql.createPool({
  connectionLimit : 100, //important
  host     : 'us-cdbr-east-04.cleardb.com',
  user     : 'bb80ea1a4e273a',
  password : '1577560d',
  database : 'heroku_a8ccc53a6508b80',
  debug    :  false
});


dbConn.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});
module.exports = dbConn

