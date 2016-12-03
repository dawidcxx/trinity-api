var mysql = require('mysql');

var config = {
  connectionLimit : 10,
  host: process.env['TC_DB_HOST'],
  user: process.env['TC_DB_USERNAME'] || 'trinity',
  password: process.env['TC_DB_PASSWORD'] || 'trinity',
};

var authDb = mysql.createPool(Object.assign({}, config, { database: 'auth' }))
var charactersDb = mysql.createPool(Object.assign({}, config, { database: 'characters' }));


module.exports = { authDb, charactersDb };