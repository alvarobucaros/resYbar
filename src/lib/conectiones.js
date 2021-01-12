const mysql=require('mysql');

const conexion=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'nodejs'
});

conexion.connect(error => {
  if (error){
    console.log('Problemas de conexion con mysql');
  }else{
    console.log('conectado con mysql');
  }
   
});

exports.conexion = conexion;