const controller = {};

controller.list = (req, res) => { 
  var { cod } = req.params; 
  cod = cod.replace(':','');
  rec=cod.split('||'); 
   req.getConnection((err, conn) => {
        var sql= 'SELECT imagenes.id, im_idempresa, im_tipoproductoid, im_productoid, im_tipo,';
        sql +=' im_imagen, im_titulo, im_descripcion, im_estado, pr_idTipo ';
        sql +=' FROM imagenes, productos WHERE  im_idEmpresa = pr_idEmpresa   ';
        sql +=' AND im_productoId=productos.id  ';
        sql +=' AND im_idempresa = 1 AND im_tipoproductoid = ' + rec[1];
        sql +=' AND im_productoid = ' +  rec[0] + '  ORDER BY im_imagen' 

        console.log(sql);
              conn.query(sql, (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.json({ data: respuesta}); 
             } 
              else { 
                var error = {error: 'No hay imagenes'}; 
              } 
             }); 
           }); 
            }; 
  
controller.listOne = (req, res) => {   
   req.getConnection((err, conn) => {
        const { id } = req.params;
        var sql= 'SELECT id, im_idempresa, im_tipoproductoid, im_productoid, im_tipo, im_imagen, im_titulo, im_descripcion';
        sql +=' FROM imagenes WHERE im_idempresa = 1 AND' ;
        sql +='  id = ? '; 
        conn.query(sql, [id], (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.render('imagenes', { data: respuesta}); 
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
        var sql= 'SELECT id, im_idempresa, im_tipoproductoid, im_productoid, im_tipo, im_imagen, im_titulo, im_descripcion';
        sql += ' FROM imagenes WHERE im_idempresa = 1 AND ';
        sql += "im_imagen LIKE '% detalle %'"
        sql +=' ORDER BY im_imagen' 
              conn.query(sql, (err, respuesta)=> { 
                if (respuesta.length>0){ 
                res.json({ data: respuesta}) 
             } 
              else { 
                var error = {error: 'No hay imagenes'}; 
              } 
             }); 
           }); 
            }; 
  
controller.listQuery = (req, res) => {  
  req.getConnection((err, conn) => {
      var sql='SELECT im_descripcion, im_imagen ';
      sql +=' FROM imagenes WHERE im_idempresa = 1';
      sql +=' ORDER BY im_imagen ';
      conn.query(sql, (err, respuesta)=> {
      if (respuesta.length>0){
        res.json({ data: respuesta});
    }
    else {
      var error = {error: 'No hay imagenes'};
    }
    });
  });
  };

 controller.save = (req, res) => {
   const data = req.body;
   req.getConnection((err, conn) => {
     var sql= 'INSERT INTO imagenes (im_idempresa, im_tipoproductoid, im_productoid, im_tipo, im_imagen, im_titulo, im_descripcion, im_estado)'
    sql += ' VALUES ( ? , ? , ? , ? , ? , ? , ?, ?) '
      conn.query(sql, [ req.body.im_idempresa , req.body.im_tipoproductoid , req.body.im_productoid , req.body.im_tipo , req.body.im_imagen , req.body.im_titulo , req.body.im_descripcion , req.body.im_estado], 
        (err, rows) => {
        res.render('imagenes');
      });
    })  
  }; 
  
  controller.delete = (req, res) => {
    const { id } = req.params;
    const data = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM imagenes WHERE id = ?',[id], 
      (err, rows) => {
        res.render('imagenes');
      });
    })
  };

  controller.update = (req, res) => { 
    console.log(req.params); 
      const { id } = req.params; 
      req.getConnection((err, conn) => { 
        var sql= 'UPDATE imagenes  SET  im_idempresa = ? ,im_tipoproductoid = ? ,im_productoid = ? ,im_tipo = ? ,im_imagen = ? ,im_titulo = ? ,im_descripcion = ?, im_estado = ?'
        sql += 'WHERE id = ? '
      conn.query(sql, [ req.body.im_idempresa , req.body.im_tipoproductoid , req.body.im_productoid , req.body.im_tipo , req.body.im_imagen , req.body.im_titulo , req.body.im_descripcion, req.body.im_estado, id], 
      (err, rows) => {
        res.render('imagenes');
        });
      }) 
    };
 
module.exports = controller;
  
