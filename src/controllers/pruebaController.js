const controller = {};

controller.list = (req, res) => {   
   req.getConnection((err, conn) => {
        var sql= 'SELECT id, pr_codigo, pr_detalle, pr_estado, pr_radios, pr_hoy, pr_check, pr_texto, pr_password, pr_email, pr_listadespl';
        sql +=' FROM pruebas ORDER BY pr_codigo' 
              conn.query(sql, (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.render('prueba', { data: respuesta}); 
             } 
              else { 
                var error = {error: 'No hay pruebas'}; 
                res.render('prueba', {data: error}); 
              } 
             }); 
           }); 
            }; 
  
controller.listOne = (req, res) => {   
   req.getConnection((err, conn) => {
        const { id } = req.params;
        var sql= 'SELECT id, pr_codigo, pr_detalle, pr_estado, pr_radios, pr_hoy, pr_check, pr_texto, pr_password, pr_email, pr_listadespl';
        sql +=' FROM pruebas WHERE ' ;
        sql +='  id = ? '; 
              conn.query(sql, (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.render('prueba', { data: respuesta}); 
             } 
              else { 
                var error = {error: 'No hay pruebas'}; 
                res.render('prueba', {data: error}); 
              } 
             }); 
           }); 
            }; 
  
controller.listVarios = (req, res) => {   
   req.getConnection((err, conn) => {
      const { det } = req.params;
      detalle = det.replace(':', '');
        var sql= 'SELECT id, pr_codigo, pr_detalle, pr_estado, pr_radios, pr_hoy, pr_check, pr_texto, pr_password, pr_email, pr_listadespl';
        sql += ' FROM pruebas WHERE ';
        sql += "pr_codigo LIKE '% detalle %'"
        sql +=' ORDER BY pr_codigo' 
              conn.query(sql, (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.render('prueba', { data: respuesta}); 
             } 
              else { 
                var error = {error: 'No hay pruebas'}; 
                res.render('prueba', {data: error}); 
              } 
             }); 
           }); 
            }; 
  
 controller.save = (req, res) => {
   const data = req.body;
   req.getConnection((err, conn) => {
     var sql= 'INSERT INTO pruebas (pr_codigo ,pr_detalle ,pr_estado ,pr_radios ,pr_hoy ,pr_check ,pr_texto ,pr_password ,pr_email ,pr_listadespl)'
    sql += ' VALUES ( ?, ?,?,?,?,?,?,?,?,?) ';
   
      conn.query(sql, [ req.body.pr_codigo , req.body.pr_detalle , req.body.pr_estado , req.body.pr_radios , req.body.pr_hoy , req.body.pr_check , req.body.pr_texto , req.body.pr_password , req.body.pr_email , req.body.pr_listadespl], 
        (err, rows) => {
        res.render('prueba');
      });
    })  
  }; 

  controller.delete = (req, res) => {
    const { id } = req.params;
    const data = req.params;
    req.getConnection((err, conn) => {
      sql='DELETE FROM pruebas WHERE id = ?'
      conn.query(sql,[id], 

      (err, rows) => {
        res.render('prueba');
      });
    })
  };

  controller.update = (req, res) => { 
      const { id } = req.params; 
      req.getConnection((err, conn) => { 
        var sql= 'UPDATE pruebas  SET  pr_codigo = ? ,pr_detalle = ? ,pr_estado = ? ,pr_radios = ? ,pr_hoy = ? ,pr_check = ? ,pr_texto = ? ,pr_password = ? ,pr_email = ? ,pr_listadespl = ?';
        sql += 'WHERE id = ? ';
      conn.query(sql, [ req.body.pr_codigo , req.body.pr_detalle , req.body.pr_estado , req.body.pr_radios , req.body.pr_hoy , req.body.pr_check , req.body.pr_texto , req.body.pr_password , req.body.pr_email , req.body.pr_listadespl, id], 
      (err, rows) => {
        res.render('prueba');
        });
      }) 
    };
 
module.exports = controller;
  
