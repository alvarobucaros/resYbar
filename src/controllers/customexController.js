const controller = {};

controller.list = (req, res) => {   
   req.getConnection((err, conn) => {
        var sql= 'SELECT id, name, address, phone, empresa';
        sql +=' FROM customex WHERE empresa = 1 ORDER BY name' 
              conn.query(sql, (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.json({ data: respuesta}); 
             } 
              else { 
                var error = {error: 'No hay customex'}; 
              } 
             }); 
           }); 
            }; 
  
controller.listOne = (req, res) => {   
   req.getConnection((err, conn) => {
        const { id } = req.params;
        var sql= 'SELECT id, name, address, phone, empresa';
        sql +=' FROM customex WHERE empresa = 1 AND' ;
        sql +='  id = ? '; 
        conn.query(sql, [id], (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.render('customex', { data: respuesta}); 
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
        var sql= 'SELECT id, name, address, phone, empresa';
        sql += ' FROM customex WHERE empresa = 1 AND ';
        sql += "name LIKE '%"+detalle+"%'"
        sql +=' ORDER BY name' 
        conn.query(sql, (err, respuesta)=> { 
          if (respuesta.length>0){ 
          res.json({ data: respuesta}); 
       } 
        else { 
          var error = {error: 'No hay customex'}; 
        } 
       }); 
     }); 
      };
      
controller.listQuery = (req, res) => {  
  req.getConnection((err, conn) => {
      var sql='SELECT id, name ';
      sql +=' FROM customex WHERE empresa = 1';
      sql +=' ORDER BY name ';
      conn.query(sql, (err, respuesta)=> {
      if (respuesta.length>0){
        res.json({ data: respuesta});
    }
    else {
      var error = {error: 'No hay customex'};
    }
    });
  });
  };

 controller.save = (req, res) => {
   const data = req.body;
   req.getConnection((err, conn) => {
     var sql= 'INSERT INTO customex (name ,address ,phone ,empresa)'
    sql += ' VALUES ( ? , ? , ? , ?) '
      conn.query(sql, [ req.body.name , req.body.address , req.body.phone , req.body.empresa], 
        (err, rows) => {
        res.render('customex');
      });
    })  
  }; 

  controller.delete = (req, res) => {
    const { id } = req.params;
    const data = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM customex WHERE id = ? ',[id], 
      (err, rows) => {
        res.render('customex');
      });
    })
  };

  controller.update = (req, res) => { 
      const { id } = req.params; 
      req.getConnection((err, conn) => { 
        var sql= 'UPDATE customex  SET  name = ? ,address = ? ,phone = ? ,empresa = ? '
        sql += 'WHERE id = ? ';   
      conn.query(sql, [ req.body.name , req.body.address , req.body.phone , req.body.empresa, id], 
      (err, rows) => {
        res.render('customex');
        });
      }) 
    };
 
module.exports = controller;
  
