
const controller = {};

controller.list = (req, res) => {  
    empresa=1; 
    req.getConnection((err, conn) => {
        var sql="SELECT id, tp_idEmpresa, tp_codigo, tp_descipcion, tp_estado ";
        sql +=" FROM tipoproductos WHERE tp_idEmpresa = " + empresa;
        sql +=" ORDER BY tp_descipcion ";
        conn.query(sql, (err, tipos)=> {
          if (tipos.length>0){
            res.json({ data: tipos});
        }
        else {
          var error = {error: 'No hay tipos'};
        }
        });
      });
    };        

    controller.listOne = (req, res) => {    
      req.getConnection((err, conn) => {
        const { id } = req.params;
        var sql="SELECT id, tp_idEmpresa, tp_codigo, tp_descipcion, tp_estado ";
        sql +=" FROM tipoproductos WHERE tp_idEmpresa = '+empresa+' AND ";
        sql +=" id = ? ";
        conn.query(sql,[id], (err, tipos)=> {
          if (tipos.length>0){
            res.render('tipos', { data: tipos});
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
      detalle = det.replace(":", "");
      var sql="SELECT id, tp_idEmpresa, tp_codigo, tp_descipcion, tp_estado ";
      sql +=" FROM tipoproductos WHERE tp_idEmpresa = '+empresa+' AND ";
      sql +=" tp_descipcion like '%"+[detalle]+"%'";
      conn.query(sql, (err, tipos)=> {
        if (tipos.length>0){
          res.json({ data: tipos});
      }
      else {
        var error = {error: 'No hay tipos'};
      }
      });
    });
};

controller.listQuery = (req, res) => {    
  req.getConnection((err, conn) => {
      var sql="SELECT tp_codigo, tp_descipcion ";
      sql +=" FROM tipoproductos WHERE tp_idEmpresa = " + empresa;
      sql +=" ORDER BY tp_descipcion ";
      conn.query(sql, (err, tipos)=> {
      if (tipos.length>0){
        res.json({ data: tipos});
    }
    else {
      var error = {error: 'No hay tipos'};
    }
    });
  });
  };
  controller.listPortal = (req, res) => {    
    const { id } = req.params;
    req.getConnection((err, conn) => {
        var sql="SELECT '* TODO' AS tp_codigo  UNION ";
        sql += " SELECT tp_codigo  ";
        sql +=" FROM tipoproductos WHERE tp_idEmpresa  = ? ORDER BY tp_codigo ";
        conn.query(sql, [id],  (err, tipos)=> {
        if (tipos.length>0){
          res.json({ data: tipos});
      }
      else {
        var error = {error: 'No hay tipos'};
      }
      });
    });
    };

  controller.save = (req, res) => {
    const data = req.body;
    alert('empresa  '+empresa);
    req.getConnection((err, conn) => {
      var sql="INSERT INTO tipoproductos (tp_idEmpresa, tp_codigo, tp_descipcion, tp_estado ) "
      sql += " VALUES (?, ?, ?, ? ) ";
       conn.query(sql, [empresa,req.body.tp_codigo,req.body.tp_descipcion, req.body.tp_estado], 
        (err, rows) => {
        res.render('tipo');
      });
    })   
  };

  controller.delete = (req, res) => {
    const { id } = req.params;
    const data = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM tipoproductos WHERE id = ?',[id], 
      (err, rows) => {
        res.render('tipo');
      });
    })
  };
  
  controller.update = (req, res) => {
      const { id } = req.params;
      req.getConnection((err, conn) => {
        var sql="UPDATE tipoproductos SET tp_codigo = ?, tp_descipcion = ?, "
        sql += "tp_estado = ? WHERE id = ?";
        conn.query(sql, [req.body.tp_codigo,req.body.tp_descipcion, req.body.tp_estado,id], 
          (err, rows) => {
          res.render('tipo');
        });
      }) 
    };
     

module.exports = controller;