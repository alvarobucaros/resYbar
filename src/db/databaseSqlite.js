const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "./data/database.sqlite3";

var db = '';
db = new sqlite3.Database(DBSOURCE, (err) =>{
    if(err){
        console.log('No conetcta a la base de datos');
    }else{
        console.log('Connected to the SQLite database.')
    }
});

// module.exports = {
//     db : 'calibracion',
//     username: '',
//     password: '',
//     params: {
//         dialect: 'sqlite',
//         storage: 'data/calibracion.sqlite',
//         define: {underscore: true},
//          } 
//     }
//     const Sequelize = require('sequelize')


module.exports = db