const controller = {};

controller.list = (req, res) => {   
   req.getConnection((err, conn) => {
        var sql= 'SELECT id, tp_idempresa, tp_codigo, tp_descipcion, tp_estado';
        sql +=' FROM tipoproductos WHERE tp_idempresa = 1 ORDER BY tp_descipcion' 
              conn.query(sql, (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.json({ data: respuesta}); 
             } 
              else { 
                var error = {error: 'No hay tipoproductos'}; 
              } 
             }); 
           }); 
            }; 
  
controller.listOne = (req, res) => {   
   req.getConnection((err, conn) => {
        const { id } = req.params;
        var sql= 'SELECT id, tp_idempresa, tp_codigo, tp_descipcion, tp_estado';
        sql +=' FROM tipoproductos WHERE tp_idempresa = 1 AND' ;
        sql +='  id = ? '; 
        conn.query(sql, [id], (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.render('tipoproductos', { data: respuesta}); 
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
        var sql= 'SELECT id, tp_idempresa, tp_codigo, tp_descipcion, tp_estado';
        sql += ' FROM tipoproductos WHERE tp_idempresa = 1 AND ';
        sql += "tp_descipcion LIKE '% detalle %'"
        sql +=' ORDER BY tp_descipcion' 
              conn.query(sql, (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.json({ data: respuesta}) 
             } 
              else { 
                var error = {error: 'No hay tipoproductos'}; 
              } 
             }); 
           }); 
            }; 
  
controller.listQuery = (req, res) => {  
  req.getConnection((err, conn) => {
      var sql='SELECT tp_estado, tp_descipcion ';
      sql +=' FROM tipoproductos WHERE tp_idempresa = 1';
      sql +=' ORDER BY tp_descipcion ';
      conn.query(sql, (err, respuesta)=> {
      if (respuesta.length>0){
        res.json({ data: respuesta});
    }
    else {
      var error = {error: 'No hay tipoproductos'};
    }
    });
  });
  };

 controller.save = (req, res) => {
   const data = req.body;
   req.getConnection((err, conn) => {
     var sql= 'INSERT INTO tipoproductos (tp_idempresa ,tp_codigo ,tp_descipcion ,tp_estado)'
    sql += ' VALUES ( ? , ? , ? , ?) '
      conn.query(sql, [ req.body.tp_idempresa , req.body.tp_codigo , req.body.tp_descipcion , req.body.tp_estado], 
        (err, rows) => {
        res.render('tipoproductos');
      });
    })  
  }; 

  controller.delete = (req, res) => {
    const { id } = req.params;
    const data = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM tipoproductos WHERE id = ?',[id], 
      (err, rows) => {
        res.render('tipoproductos');
      });
    })
  };

  controller.update = (req, res) => { 
      const { id } = req.params; 
      req.getConnection((err, conn) => { 
      var sql= 'UPDATE tipoproductos  SET  tp_idempresa = ? ,tp_codigo = ? ,tp_descipcion = ? ,tp_estado = ?'
      sql += 'WHERE id = ? '
      conn.query(sql, [ req.body.tp_idempresa , req.body.tp_codigo , req.body.tp_descipcion , req.body.tp_estado, id], 
      (err, rows) => {
        res.render('tipoproductos');
        });
      }) 
    };

module.exports = controller;
  
