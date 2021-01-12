const controller = {};

controller.list = (req, res) => {   
   req.getConnection((err, conn) => {
        var sql= 'SELECT id, em_nombre, em_direccion, em_zona, em_localidad, em_barrio, '
        sql +=' em_nit, em_telefono, em_email, em_usuario, em_sloganppal, em_slogansec,  '
        sql +=' em_negocio, em_observaciones, em_autentica, em_ciudad';
        sql +=' FROM empresas WHERE id = 1 ORDER BY em_nombre' 
              conn.query(sql, (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.json({ data: respuesta}); 
             } 
              else { 
                var error = {error: 'No hay empresas'}; 
              } 
             }); 
           }); 
            }; 
  
controller.listOne = (req, res) => {   
   req.getConnection((err, conn) => {
        const { id } = req.params;
        var sql= 'SELECT id, em_nombre, em_direccion, em_zona, em_localidad, em_barrio, em_nit, em_telefono, em_email, em_usuario, em_sloganppal, em_slogansec, em_negocio, em_observaciones, em_autentica, em_ciudad';
        sql +=' FROM empresas WHERE ' ;
        sql +='  id = ? '; 
        conn.query(sql, [id], (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.render('empresas', { data: respuesta}); 
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
        var sql= 'SELECT id, em_nombre, em_direccion, em_zona, em_localidad, em_barrio, em_nit, em_telefono, em_email, em_usuario, em_sloganppal, em_slogansec, em_negocio, em_observaciones, em_autentica, em_ciudad';
        sql += ' FROM empresas WHERE id = 1 AND ';
        sql += "em_nombre LIKE '% detalle %'"
        sql +=' ORDER BY em_nombre' 
              conn.query(sql, (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.json({ data: respuesta}) 
             } 
              else { 
                var error = {error: 'No hay empresas'}; 
              } 
             }); 
           }); 
            }; 
  
controller.listQuery = (req, res) => {  
  req.getConnection((err, conn) => {
      var sql='SELECT em_ciudad, em_nombre ';
      sql +=' FROM empresas WHERE id = 1';
      sql +=' ORDER BY em_nombre ';
      conn.query(sql, (err, respuesta)=> {
      if (respuesta.length>0){
        res.json({ data: respuesta});
    }
    else {
      var error = {error: 'No hay empresas'};
    }
    });
  });
  };

 controller.save = (req, res) => {
   const data = req.body;
   req.getConnection((err, conn) => {
     var sql= 'INSERT INTO empresas (em_nombre ,em_direccion ,em_zona ,em_localidad ,em_barrio ,em_nit ,em_telefono ,em_email ,em_usuario ,em_sloganppal ,em_slogansec ,em_negocio ,em_observaciones ,em_autentica ,em_ciudad)'
    sql += ' VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?) '
      conn.query(sql, [ req.body.em_nombre , req.body.em_direccion , req.body.em_zona , req.body.em_localidad , req.body.em_barrio , req.body.em_nit , req.body.em_telefono , req.body.em_email , req.body.em_usuario , req.body.em_sloganppal , req.body.em_slogansec , req.body.em_negocio , req.body.em_observaciones , req.body.em_autentica , req.body.em_ciudad], 
        (err, rows) => {
        res.render('empresas');
      });
    })  
  }; 

  controller.delete = (req, res) => {
    const { id } = req.params;
    const data = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM empresas WHERE id = ?',[id], 
      (err, rows) => {
        res.render('empresas');
      });
    })
  };

  controller.update = (req, res) => { 
      const { id } = req.params; 
      req.getConnection((err, conn) => { 
        var sql= 'UPDATE empresas  SET  em_nombre = ? ,em_direccion = ? ,em_zona = ? ,em_localidad = ? ,em_barrio = ? ,em_nit = ? ,em_telefono = ? ,em_email = ? ,em_usuario = ? ,em_sloganppal = ? ,em_slogansec = ? ,em_negocio = ? ,em_observaciones = ? ,em_autentica = ? ,em_ciudad = ?'
        sql += 'WHERE id = ? '
      conn.query(sql, [ req.body.em_nombre , req.body.em_direccion , req.body.em_zona , req.body.em_localidad , req.body.em_barrio , req.body.em_nit , req.body.em_telefono , req.body.em_email , req.body.em_usuario , req.body.em_sloganppal , req.body.em_slogansec , req.body.em_negocio , req.body.em_observaciones , req.body.em_autentica , req.body.em_ciudad, id], 
      (err, rows) => {
        res.render('empresas');
        });
      }) 
    };
 
module.exports = controller;
  
