const md5 = require('js-md5');
const controller = {};

controller.list = (req, res) => {   
   req.getConnection((err, conn) => {
        var sql= 'SELECT id, us_idempresa, us_nombre, us_email, us_direccion, us_zona, ';
        sql +=' us_localidad, us_barrio, us_doctipo, us_docnumero, us_telefono, us_clave, ';
        sql +=' us_estado ';
        sql +=' FROM usuarios WHERE us_idempresa = 1 ORDER BY us_nombre' 
              conn.query(sql, (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.json({ data: respuesta}); 
             } 
              else { 
                var error = {error: 'No hay usuarios'}; 
              } 
             }); 
           }); 
            }; 
  
controller.listOne = (req, res) => {   
   req.getConnection((err, conn) => {
        const { id } = req.params;
        var sql= 'SELECT id, us_idempresa, us_nombre, us_email, us_direccion, us_zona, ';
        sql +=' us_localidad, us_barrio, us_doctipo, us_docnumero, us_telefono, us_clave, ';
        sql +=' us_estado';
        sql +=' FROM usuarios WHERE us_idempresa = 1 AND' ;
        sql +='  id = ? '; 
        conn.query(sql, [id], (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.render('usuarios', { data: respuesta}); 
             } 
              else { 
                 res.json(err); 
              } 
             }); 
           }); 
            }; 
  
controller.listVarios = (req, res) => {   
   req.getConnection((err, conn) => {
      const { det } = req.params;
      detalle = det.replace(':', '');
        var sql= 'SELECT id, us_idempresa, us_nombre, us_email, us_direccion, us_zona, ';
        sql +=' us_localidad, us_barrio, us_doctipo, us_docnumero, us_telefono, us_clave, ';
        sql +=' us_estado';
        sql += ' FROM usuarios WHERE us_idempresa = 1 AND ';
        sql += "us_nombre LIKE '% detalle %'"
        sql +=' ORDER BY us_nombre' 
              conn.query(sql, (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.json({ data: respuesta}) 
             } 
              else { 
                var error = {error: 'No hay usuarios'}; 
              } 
             }); 
           }); 
            }; 
  
controller.listQuery = (req, res) => {  
  req.getConnection((err, conn) => {
      var sql='SELECT us_estado, us_nombre ';
      sql +=' FROM usuarios WHERE us_idempresa = 1';
      sql +=' ORDER BY us_nombre ';
      conn.query(sql, (err, respuesta)=> {
      if (respuesta.length>0){
        res.json({ data: respuesta});
    }
    else {
      var error = {error: 'No hay usuarios'};
    }
    });
  });
  };

 controller.save = (req, res) => {
   const data = req.body;
   req.getConnection((err, conn) => {
     var sql= 'INSERT INTO usuarios (us_idempresa ,us_nombre ,us_email ,us_direccion ,';
     sql +=' us_zona ,us_localidad ,us_barrio ,us_doctipo ,us_docnumero ,us_telefono ,';
     sql +=' us_clave ,us_estado)'
    sql += ' VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?) '
      conn.query(sql, [ req.body.us_idempresa , req.body.us_nombre , req.body.us_email , req.body.us_direccion , req.body.us_zona , req.body.us_localidad , req.body.us_barrio , req.body.us_doctipo , req.body.us_docnumero , req.body.us_telefono , md5(req.body.us_clave) , req.body.us_estado], 
        (err, rows) => {
        res.render('usuarios');
      });
    })  
  }; 

  controller.delete = (req, res) => {
    const { id } = req.params;
    const data = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM usuarios WHERE id = ?',[id], 
      (err, rows) => {
        res.render('usuarios');
      });
    })
  };

  controller.update = (req, res) => { 
    const { us_clave } = req.params;
      var { id } = req.params; 
      rec=id.split('||');
      id=rec[0];
      clave = md5(rec[1])
      req.getConnection((err, conn) => { 
        var sql= 'UPDATE usuarios  SET  us_idempresa = ? ,us_nombre = ? ,us_email = ? ,';
        sql +=' us_direccion = ? ,us_zona = ? ,us_localidad = ? ,us_barrio = ? ,';
        sql +=' us_doctipo = ? ,us_docnumero = ? ,us_telefono = ? ,us_clave = ? ,';
        sql +=' us_estado = ?'
        sql += 'WHERE id = ? '
      conn.query(sql, [ req.body.us_idempresa , req.body.us_nombre , req.body.us_email , req.body.us_direccion , req.body.us_zona , req.body.us_localidad , req.body.us_barrio , req.body.us_doctipo , req.body.us_docnumero , req.body.us_telefono , clave , req.body.us_estado, id], 
      (err, rows) => {
        res.render('usuarios');
        });
      }) 
    };
 
module.exports = controller;
  
