const controller = {};

controller.list = (req, res) => {   
   req.getConnection((err, conn) => {
        var sql= "SELECT id, pr_idempresa, pr_idtipo, pr_codigo, pr_descipcion,  pr_foto,  ";
        sql +=' pr_diasventa, pr_precio, pr_inventario, pr_existencias, pr_descpesos,  ';
        sql +=' pr_descporcentaje, pr_iva, pr_marca, pr_referencia, pr_estado, pr_tipoproductoId, ';
        sql +=' pr_titulo FROM productos WHERE pr_idempresa = 1 ORDER BY pr_descipcion' ;
              conn.query(sql, (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.json({ data: respuesta}); 
             } 
              else { 
                var error = {error: 'No hay productos'}; 
              } 
             }); 
           }); 
            }; 
  
controller.listOne = (req, res) => {   
   req.getConnection((err, conn) => {
        const { id } = req.params;
        var sql= 'SELECT id, pr_idempresa, pr_idtipo, pr_codigo, pr_descipcion, pr_foto,  ';
        sql +=' pr_diasventa, pr_precio, pr_inventario, pr_existencias, pr_descpesos,  ';
        sql +=' pr_descporcentaje, pr_iva, pr_marca, pr_referencia, pr_estado, pr_tipoproductoId, ';
        sql +=' pr_titulo FROM productos WHERE pr_idempresa = 1 AND' ;
        sql +='  id = ? '; 
        conn.query(sql, [id], (err, respuesta)=> { 
            if (respuesta.length>0){ 
                res.render('productos', { data: respuesta}); 
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
        var sql= 'SELECT id, pr_idempresa, pr_idtipo, pr_codigo, pr_descipcion, pr_foto,  ';
        sql +=' pr_diasventa, pr_precio, pr_inventario, pr_existencias, pr_descpesos,  ';
        sql +=' pr_descporcentaje, pr_iva, pr_marca, pr_referencia, pr_estado, pr_tipoproductoId, ';
        sql +=' pr_titulo FROM productos WHERE pr_idempresa = 1 AND ';
        sql += "pr_descipcion LIKE '%"+ detalle + "%' OR pr_codigo  LIKE '%"+ detalle + "%' ";
        sql +=' ORDER BY pr_descipcion' ;    
              conn.query(sql, (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.json({ data: respuesta}) 
             } 
              else { 
                var error = {error: 'No hay productos'}; 
              } 
             }); 
           }); 
            }; 
  
controller.listQuery = (req, res) => {  
  req.getConnection((err, conn) => {
      var sql='SELECT pr_estado, pr_descipcion ';
      sql +=' FROM productos WHERE pr_idempresa = 1';
      sql +=' ORDER BY pr_descipcion ';
      conn.query(sql, (err, respuesta)=> {
      if (respuesta.length>0){
        res.json({ data: respuesta});
    }
    else {
      var error = {error: 'No hay productos'};
    }
    });
  });
  };

controller.listPortal = (req, res) =>{
  req.getConnection((err, conn) => {
    const { llave } = req.params;
    keys = llave.replace(':', '');
    rec = keys.split('||');
 
      var sql= "SELECT id, pr_idEmpresa, pr_idTipo, pr_codigo, pr_descipcion, pr_foto,  ";
      sql +=" pr_titulo, pr_diasVenta, pr_precio, pr_inventario, pr_existencias,  ";
      sql +=" pr_descPesos, pr_descPorcentaje, pr_iva, pr_marca, pr_referencia, pr_estado, ";
      sql +=" pr_tipoproductoId, pr_ofertaDesde, pr_ofertaHasta ";
      sql +=" FROM productos where pr_estado ='A' AND pr_idEmpresa = " + rec[0] ;
      if (rec[1] !== "OFERTAS")
      {
        if (rec[1] !== "* TODO"){
          sql +=" AND pr_idTipo = '" + rec[1]+ "'";
        }
      }      
      else{
        sql +=" AND pr_ofertaDesde <= '"+ rec[2] +"' AND  pr_ofertaHasta  >= '"+ rec[2] +"'";
      }
      sql +=" ORDER BY  pr_precio ";

// console.log(sql);
            conn.query(sql, (err, respuesta)=> { 
              if (respuesta.length>0){ 
              res.json({ data: respuesta}) 
           } 
            else { 
              var error = {error: 'No hay productos'}; 
            } 
           }); 
         }); 
};

 controller.save = (req, res) => {
   const data = req.body;
   req.getConnection((err, conn) => {
     var sql= 'INSERT INTO productos (pr_idempresa ,pr_idtipo ,pr_codigo ,pr_descipcion , ';
     sql +=' pr_foto ,pr_diasventa ,pr_precio ,pr_inventario ,pr_existencias ,pr_descpesos , ';
     sql +=' pr_descporcentaje ,pr_iva ,pr_marca ,pr_referencia ,pr_estado, ';
     sql +=' pr_tipoproductoId, pr_titulo)'
     sql += ' VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?, ?, ?) '
      conn.query(sql, [ req.body.pr_idempresa , req.body.pr_idtipo , req.body.pr_codigo , 
        req.body.pr_descipcion , req.body.pr_foto , req.body.pr_diasventa , 
        req.body.pr_precio , req.body.pr_inventario , req.body.pr_existencias , 
        req.body.pr_descpesos , req.body.pr_descporcentaje , req.body.pr_iva , 
        req.body.pr_marca , req.body.pr_referencia , req.body.pr_estado, 
        req.body.pr_tipoproductoId, , req.body.pr_titulo], 
        (err, rows) => {
        res.render('productos');
      });
    })  
  }; 

  controller.delete = (req, res) => {
    const { id } = req.params;
    const data = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM productos WHERE id = ?',[id], 
      (err, rows) => {
        res.render('productos');
      });
    })
  };

  controller.update = (req, res) => { 
      const { id } = req.params; 
      req.getConnection((err, conn) => { 
        var sql= 'UPDATE productos  SET  pr_idempresa = ? ,pr_idtipo = ? ,pr_codigo = ? , ';
        sql +=' pr_descipcion = ? ,pr_foto = ? ,pr_diasventa = ? ,pr_precio = ? , ';
        sql +=' pr_inventario = ? ,pr_existencias = ? ,pr_descpesos = ? , ';
        sql +=' pr_descporcentaje = ? ,pr_iva = ? ,pr_marca = ? ,pr_referencia = ? , ';
        sql +=' pr_estado = ?, pr_titulo = ? '
        sql += 'WHERE id = ? '
      conn.query(sql, [ req.body.pr_idempresa , req.body.pr_idtipo , req.body.pr_codigo , 
        req.body.pr_descipcion , req.body.pr_foto , req.body.pr_diasventa , 
        req.body.pr_precio , req.body.pr_inventario , req.body.pr_existencias , 
        req.body.pr_descpesos , req.body.pr_descporcentaje , req.body.pr_iva , 
        req.body.pr_marca , req.body.pr_referencia ,  req.body.pr_estado, 
        req.body.pr_titulo, id], 
      (err, rows) => {
        res.render('productos');
        });
      }) 
    };
 
    controller.tipoproductosQuery = (req, res) => {
      req.getConnection((err, conn) => {
      var sql="SELECT concat(id,'||', tp_codigo) tp_codigo, tp_descipcion ";
      sql +=" FROM tipoproductos WHERE tp_idEmpresa=1 ";
      sql +=" ORDER BY  tp_descipcion ";     
      conn.query(sql, (err, resul)=> {  
      if (resul.length>0){
          res.json({ data: resul});
       }
       else {
          var error = {error: 'No hay registros'};
       }
      });
      });
     };
 
     controller.productosQuery = (req, res) => {
      const { det } = req.params;
      detalle = det.replace(':', '');
      req.getConnection((err, conn) => {
      var sql="SELECT id, CONCAT(pr_codigo,' ',pr_descipcion) pr_descipcion ";
      sql +=" FROM productos WHERE  pr_idempresa = 1 AND  pr_idTipo = '"+detalle+"' ";
      sql +=' ORDER BY  pr_descipcion';        
      conn.query(sql, (err, resul)=> {
      if (resul.length>0){
          res.json({ data: resul});
       }
       else {
          var error = {error: 'No hay registros'};
       }
      });
      });
     };

    //
    controller.propuctosPromocion = (req, res) => {
      const { cod } = req.params;
      codigo = cod.replace(':', '');
      req.getConnection((err, conn) => {
      var sql="SELECT id, pr_descipcion, pr_diasVenta, pr_precio, pr_existencias, ";
      sql +=" pr_descPesos, pr_descPorcentaje, pr_iva, pr_ofertaDesde, pr_ofertaHasta, ";
      sql +=" pr_titulo ";
      sql +="  FROM productos WHERE pr_tipoproductoId = " + codigo
      sql +=' ORDER BY  pr_descipcion';      
      conn.query(sql, (err, resul)=> {
      if (resul.length>0){
          res.json({ data: resul});
        }
        else {
          var error = {error: 'No hay registros'};
        }
      });
      });
      };
           
module.exports = controller;
  