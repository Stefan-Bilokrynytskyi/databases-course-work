'use strict';

const mysql = require('mysql2');

const Pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2409",
  database: "surveydb"
});

module.exports = { Pool };