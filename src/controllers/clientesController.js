const controller = {};

controller.list = (req, res) => {   
   req.getConnection((err, conn) => {
        var sql= 'SELECT id, cl_idempresa, cl_tipodocumento, cl_documentoid, cl_nombre, ';
        sql += 'cl_telefono, cl_email, cl_direccion, cl_ciudad, cl_zona, cl_localidad, ';
        sql += 'cl_barrio, cl_genero, cl_estado ';
        sql +=' FROM clientes WHERE cl_idempresa = 1 ORDER BY cl_nombre' 
              conn.query(sql, (err, respuesta)=> {             
                if (respuesta.length>0){ 
                res.json({ data: respuesta}); 
             } 
              else { 
                var error = {error: 'No hay clientes'}; 
              } 
             }); 
           }); 
            }; 
  
controller.listOne = (req, res) => {   
   req.getConnection((err, conn) => {
      var { cod } = req.params; 
      cod = cod.replace(':','');
console.log(cod);
      rec=cod.split('||'); 
      var sql= 'SELECT id, cl_idempresa, cl_tipodocumento, cl_documentoid, ';
      sql +=' cl_nombre, cl_telefono, cl_email, cl_direccion, cl_ciudad, cl_zona, ';
      sql +=' cl_localidad, cl_barrio, cl_genero, cl_estado';
      sql +=' FROM clientes WHERE cl_idempresa = 1 AND' ;
      sql +=" cl_tipodocumento = '" + rec[0] + "' AND ";
      sql +=" cl_documentoid  = '" + rec[1] + "' ";
      conn.query(sql, [id], (err, respuesta)=> { 
          if (respuesta.length>0){ 
            res.render('clientes', { data: respuesta}); 
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
        var sql= 'SELECT id, cl_idempresa, cl_tipodocumento, cl_documentoid, cl_nombre, cl_telefono, cl_email, cl_direccion, cl_ciudad, cl_zona, cl_localidad, cl_barrio, cl_genero, cl_estado';
        sql += ' FROM clientes WHERE cl_idempresa = 1 AND ';
        sql += "cl_nombre LIKE '% detalle %'"
        sql +=' ORDER BY cl_nombre' 
              conn.query(sql, (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.json({ data: respuesta}) 
             } 
              else { 
                var error = {error: 'No hay clientes'}; 
              } 
             }); 
           }); 
            }; 
  
controller.listQuery = (req, res) => {  
  req.getConnection((err, conn) => {
      var sql='SELECT cl_estado, cl_nombre ';
      sql +=' FROM clientes WHERE cl_idempresa = 1';
      sql +=' ORDER BY cl_nombre ';
      conn.query(sql, (err, respuesta)=> {
      if (respuesta.length>0){
        res.json({ data: respuesta});
    }
    else {
      var error = {error: 'No hay clientes'};
    }
    });
  });
  };

 controller.save = (req, res) => {
   const data = req.body;
   req.getConnection((err, conn) => {
     var sql= 'INSERT INTO clientes (cl_idempresa ,cl_tipodocumento ,cl_documentoid ,cl_nombre ,cl_telefono ,cl_email ,cl_direccion ,cl_ciudad ,cl_zona ,cl_localidad ,cl_barrio ,cl_genero ,cl_estado)'
    sql += ' VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?) '
      conn.query(sql, [ req.body.cl_idempresa , req.body.cl_tipodocumento , req.body.cl_documentoid , req.body.cl_nombre , req.body.cl_telefono , req.body.cl_email , req.body.cl_direccion , req.body.cl_ciudad , req.body.cl_zona , req.body.cl_localidad , req.body.cl_barrio , req.body.cl_genero , req.body.cl_estado], 
        (err, rows) => {
        res.render('clientes');
      });
    })  
  }; 

  controller.delete = (req, res) => {
    const { id } = req.params;
    const data = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM clientes WHERE id = ?',[id], 
      (err, rows) => {
        res.render('clientes');
      });
    })
  };

  controller.update = (req, res) => { 
      const { id } = req.params; 
      req.getConnection((err, conn) => { 
        var sql= 'UPDATE clientes  SET  cl_idempresa = ? ,cl_tipodocumento = ? ,cl_documentoid = ? ,cl_nombre = ? ,cl_telefono = ? ,cl_email = ? ,cl_direccion = ? ,cl_ciudad = ? ,cl_zona = ? ,cl_localidad = ? ,cl_barrio = ? ,cl_genero = ? ,cl_estado = ?'
        sql += 'WHERE id = ? '
      conn.query(sql, [ req.body.cl_idempresa , req.body.cl_tipodocumento , req.body.cl_documentoid , req.body.cl_nombre , req.body.cl_telefono , req.body.cl_email , req.body.cl_direccion , req.body.cl_ciudad , req.body.cl_zona , req.body.cl_localidad , req.body.cl_barrio , req.body.cl_genero , req.body.cl_estado, id], 
      (err, rows) => {
        res.render('clientes');
        });
      }) 
    };
 
module.exports = controller;
  
