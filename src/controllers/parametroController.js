
const controller = {};

controller.list = (req, res) => {   
   req.getConnection((err, conn) => {
        var sql= 'SELECT id, pm_idempresa, pm_representante, pm_web, pm_email, pm_banco, pm_cuenta, '
        sql += ' pm_tipocuenta, pm_logo, pm_consecpedido, pm_consecfactura, '
        sql += ' pm_whatsapp, pm_facebook, pm_instagram, pm_twitter ';
        sql +=' FROM parametros WHERE pm_idempresa = 1 ORDER BY pm_web' 
              conn.query(sql, (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.json({ data: respuesta}); 
             } 
              else { 
                var error = {error: 'No hay parametros'}; 
              } 
            }); 
      }); 
}; 
  
controller.listOne = (req, res) => {   
  var empresa = 1;
   req.getConnection((err, conn) => {
        const { id } = req.params;
        var sql= 'SELECT id, pm_idempresa, pm_representante, pm_web, pm_email, pm_banco, pm_cuenta,'
        sql += ' pm_tipocuenta, pm_logo, pm_consecpedido, pm_consecfactura, '
        sql += ' pm_whatsapp, pm_facebook, pm_instagram, pm_twitter ';
        sql += ' FROM parametros WHERE pm_idempresa = 1 AND' ;
        sql += '  id = ? '; 
        conn.query(sql, [id], (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.render('parametro', { data: respuesta}); 
             } 
              else { 
                 res.json(err); 
              } 
             }); 
           }); 
            }; 
  
controller.listVarios = (req, res) => { 
  var empresa = 1;  
   req.getConnection((err, conn) => {
      const { det } = req.params;
      detalle = det.replace(':', '');
        var sql= 'SELECT id, pm_idempresa, pm_representante, pm_web, pm_email, pm_banco, pm_cuenta, '
        sql += ' pm_tipocuenta, pm_logo, pm_consecpedido, pm_consecfactura, '
        sql += ' pm_whatsapp, pm_facebook, pm_instagram, pm_twitter ';
        sql += ' FROM parametros WHERE pm_idempresa = 1 AND ';
        sql += "pm_web LIKE '% detalle %'"
        sql +=' ORDER BY pm_web' 
              conn.query(sql, (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.json({ data: respuesta}) 
             } 
              else { 
                var error = {error: 'No hay parametros'}; 
              } 
             }); 
           }); 
            }; 
  
controller.listQuery = (req, res) => {
  var empresa = 1;  
  req.getConnection((err, conn) => {
      var sql='SELECT id, pm_web ';
      sql +=' FROM parametros WHERE pm_idempresa = 1' ;
      sql +=' ORDER BY pm_web ';
      conn.query(sql, (err, respuesta)=> {
      if (respuesta.length>0){
        res.json({ data: respuesta});
    }
    else {
      var error = {error: 'No hay parametros'};
    }
    });
  });
  };

 controller.save = (req, res) => {
  var empresa = 1;
   const data = req.body;
   req.getConnection((err, conn) => {
     var sql= 'INSERT INTO parametros (pm_idempresa ,pm_representante ,pm_web ,pm_email ,'
     sql += 'pm_banco ,pm_cuenta , pm_tipocuenta, pm_logo ,pm_consecpedido ,pm_consecfactura,'
     sql += ' pm_whatsapp, pm_facebook, pm_instagram, pm_twitter )'
    sql += ' VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ?, ?, ?, ?, ?) '
      conn.query(sql, [ empresa, req.body.pm_representante , req.body.pm_web ,
         req.body.pm_email , req.body.pm_banco , req.body.pm_cuenta ,  req.body.pm_tipocuenta,
          req.body.pm_logo , req.body.pm_consecpedido , req.body.pm_consecfactura,
          req.body.pm_whatsapp, req.body.pm_facebook, req.body.pm_instagram, req.body.pm_twitter], 
        (err, rows) => {
        res.render('parametro');
      });
    })  
  }; 

  controller.delete = (req, res) => {
    var empresa = preferencias.getEmpresa();
    const { id } = req.params;
    const data = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM parametros WHERE id = ?',[id], 
      (err, rows) => {
        res.render('parametro');
      });
    })
  };

  controller.updateLogo = (req, res) =>{
    var empresa = 1
    const imagen = req.params;
    rec=imagen.imagen.split('|');
    req.getConnection((err, conn) => { 
      var sql= 'UPDATE parametros  SET  pm_logo = ? WHERE pm_idEmpresa = ? '
      conn.query(sql, [ rec[0] , empresa], 
      (err, rows) => {
        res.render('parametro');
        });
    }
    
    )};

  controller.update = (req, res) => { 
    var empresa = preferencias.getEmpresa();
      const { id } = req.params; 
      req.getConnection((err, conn) => { 
        var sql= 'UPDATE parametros  SET  pm_idempresa = ? ,pm_representante = ? ,pm_web = ? ,'
        sql += 'pm_email = ? ,pm_banco = ? ,pm_cuenta = ? ,pm_tipocuenta = ?, pm_logo = ? ,'
        sql += 'pm_consecpedido = ? ,pm_consecfactura = ?,  pm_whatsapp = ?, '
        sql += 'pm_facebook  = ?, pm_instagram = ?, pm_twitter = ? '
        sql += 'WHERE pm_idEmpresa = ? '
 
      conn.query(sql, [empresa , req.body.pm_representante , req.body.pm_web , 
        req.body.pm_email , req.body.pm_banco , req.body.pm_cuenta , req.body.pm_tipocuenta, 
        req.body.pm_logo , req.body.pm_consecpedido , req.body.pm_consecfactura, req.body.pm_whatsapp, 
        req.body.pm_facebook, req.body.pm_instagram, req.body.pm_twitter, empresa], 
        (err, rows) => {
        res.render('parametro');
        });
      }) 
    };
 
module.exports = controller;
  
