// db.js
const mysql = require('mysql');

const dbConf = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'tests'
};

// Crea el pool de conexiones
const pool = mysql.createPool(dbConf);

module.exports = {
  pool
};
