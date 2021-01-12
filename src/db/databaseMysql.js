const mysql = require('mysql');
const myConnection = require('express-myconnection');

let db = '';
db = new myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'nodejs'
  },'single');
  
module.exports = db