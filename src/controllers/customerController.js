const md5 = require('js-md5');
var preferencias = require('../public/js/global');

const controller = {};

controller.index = (req, res) => {    
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM customer', (err, customers)=> {
    if (!err){
      res.render('index', {
        data: customers
      });
    }
    else {
      res.json(err);
    }
    });
  });
  };
  
  controller.admin = (req, res) => {    
    req.getConnection((err, conn) => {
      res.render('login', {data: {error:''}});
    });
    };

    controller.inicio = (req, res) => {    
      req.getConnection((err, conn) => {
        res.render('portal00', {data: {error:''}});
      });
      };

  controller.temporal = (req, res) => {    
    req.getConnection((err, conn) => {
      res.render('login', {data: {error:''}});
    });
    };

    controller.autentica = (req, res) => {  
      const { id } = req.params;
      var pswr = md5(req.body.pswr);
      var user = req.body.user
      req.getConnection((err, conn) => {
        var sql="SELECT  usuarios.id, us_idEmpresa, us_clave, us_nombre, em_nombre, em_slogansec, ";
        sql +="em_autentica, CASE em_negocio WHEN 'R' THEN 'Restaurantes' WHEN 'B' THEN 'Bares' ";
        sql +=" ELSE 'Venta Electrónica' END em_negocio ";
        sql +=" FROM usuarios INNER JOIN empresas ON empresas.id = us_idEmpresa ";
        sql +=" WHERE us_email = '" + user + "' AND us_clave = '" + pswr + "'";
        conn.query(sql, (err, login)=> {
        if (login.length>0){
          preferencias.setEmpresa(login[0].us_idEmpresa);
          preferencias.setNegocio(login[0].em_negocio.substring(0,1));
          preferencias.setUsuario(login[0].id);
          preferencias.setAutentica('S');
          res.render('index', {data: login});
        }
        else {
          var error = {error: 'Usuario o constraseña errado'};
          res.render('login', {data: error});
        }
        });
      });
      };

      // Informacion de la empresa y de parametros
controller.portal0 = (req,res)=>{ 
  req.getConnection((err, conn) => {
      var sql="SELECT  em_nombre, em_direccion, em_zona, em_localidad, em_barrio, em_nit, "
      sql +=" em_telefono, em_email, em_usuario, em_sloganppal,em_slogansec,em_negocio, "
      sql +=" em_observaciones, em_autentica, pm_representante, pm_web,pm_email, pm_banco, "
      sql +=" pm_cuenta, pm_tipocuenta, pm_logo, pm_consecpedido, pm_consecfactura, em_ciudad, "
      sql +=" pm_whatsapp, pm_facebook, pm_instagram, pm_twitter ";
      sql +=" FROM empresas "
      sql +="INNER JOIN parametros ON pm_idEmpresa = empresas.id  "
      sql +="WHERE empresas.id=1 ";
      conn.query(sql,  (err, datos)=> {
      if (datos.length>0){
        res.json({ data: datos});
    }
    else {
      var error = {error: 'No hay tipos'};
    }
    });
  });
  };

controller.list = (req, res) => {    
req.getConnection((err, conn) => {
  conn.query('SELECT * FROM customer', (err, customers)=> {
  if (!err){
    res.render('customers', {
      data: customers
    });
  }
  else {
    res.json(err);
  }
  });
});
};
 
controller.listOne = (req, res) => {    
    req.getConnection((err, conn) => {
      const { id } = req.params;
      conn.query('SELECT * FROM customer WHERE id = ?',[id], (err, customers)=> {
      if (!err){
        res.render('customers', {
          data: customers
        });
      }
      else {
        res.json(err);
      }
      });
    });
};


controller.save = (req, res) => {
  const data = req.body;
  er='';
  if(data.name === ''){er +='Falta Nombre \n';}
  if(data.address === ''){er +='Falta address \n';}
  if(data.phone === ''){er +='Falta phone \n';}
  if(er === ''){
    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO customer set ?',[data], (err, customers) => {
        res.redirect('/');
        });
    });
    }else{
        console.log(er);
        res.json({error:er});
    }
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query('DELETE FROM customer WHERE id = ?',[id], (err, rows) => {
      res.redirect('/');
    });
  })
};

controller.update = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
      conn.query('UPDATE customer SET name =?, address =?, phone =? WHERE id = ?', [req.body.name,req.body.address, req.body.phone, req.body.Id], (err, rows) => {
        res.redirect('/');
      });
    })
  };

  controller.upload = (req, res) => {
    console.log('cargara');
  };

  

module.exports = controller;
