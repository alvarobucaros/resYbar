const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:path.join(__dirname,'../public/logos'),
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

/// middlewares
router.use(multer({
    storage,
    dest: path.join(__dirname, '../public/logos'),
    
    limits:{fieldSize: 2000000},
    fileFilter: (req, file, cb) =>{
        const fileTypes = /jpeg|jpg|png|gif|PNG/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if(mimetype && extname){
            return cb(null, true);
        }
        cb("error. No es una imagen");
    }
  }).single('logoimagen'));
  
const clientesController = require('../controllers/clientesController');
const customerController = require('../controllers/customerController');
const empresasController = require('../controllers/empresaController');  
const tipoController = require('../controllers/tipoController');
const usuariosController = require('../controllers/usuarioController'); 
const pruebaController = require('../controllers/pruebaController');  
const productosController = require('../controllers/productoController');  
const parametrosController = require('../controllers/parametroController');  
const customexController = require('../controllers/customexController');  
const tipoproductosController = require('../controllers/tipoproductoController');  
const imagenesController = require('../controllers/imageneController');   

// rutas para imagenes
router.get('/imalist/:cod', imagenesController.list); 
router.get('/imagenes', function(req, res){    res.render('imagenes');}); 
router.get('/imagenes', imagenesController.list); 
router.get('/imalistV/:det', imagenesController.listVarios);
router.get('/imagenes/:id', imagenesController.listOne);
router.post('/imaadd', imagenesController.save);
router.put('/imaadd/:id', imagenesController.update);
router.get('/imadelete/:id', imagenesController.delete);

// rutas para tipoproductos
router.get('/tiplist', tipoproductosController.list); 
router.get('/tipoproductos', function(req, res){    res.render('tipoproductos');}); 
router.get('/tipoproductos', tipoproductosController.list); 
router.get('/tiplistV/:det', tipoproductosController.listVarios);
router.get('/tipoproductos/:id', tipoproductosController.listOne);
router.post('/tipadd', tipoproductosController.save);
router.put('/tipadd/:id', tipoproductosController.update);
router.get('/tipdelete/:id', tipoproductosController.delete);

// rutas para customex
router.get('/cuslist', customexController.list); 
router.get('/customex', function(req, res){    res.render('customex');}); 
router.get('/customex', customexController.list); 
router.get('/cuslistV/:det', customexController.listVarios);
router.get('/customex/:id', customexController.listOne);
router.post('/cusadd', customexController.save);
router.put('/cusadd/:id', customexController.update);
router.get('/cusdelete/:id', customexController.delete);


// rutas para parametros
router.get('/parlist', parametrosController.list); 
router.get('/parametros', function(req, res){    res.render('parametro');}); 
router.get('/parametros', parametrosController.list); 
router.get('/parametros/:det', parametrosController.listVarios);
router.get('/parametros/:id', parametrosController.listOne);
router.post('/paradd', parametrosController.save);
router.put('/paradd/:id', parametrosController.update);
router.get('/pardelete/:id', parametrosController.delete);
router.get('/updateLogo/:imagen', parametrosController.updateLogo);

// rutas para prueba
router.get('/prueba', pruebaController.list); 
router.get('/pruebas/:det', pruebaController.listVarios);
router.get('/prueba/:id', pruebaController.listOne);
router.post('/pruadd', pruebaController.save);
router.put('/pruadd/:id', pruebaController.update);
router.get('/prudelete/:id', pruebaController.delete);

// rutas para empresas
router.get('/emplist', empresasController.list); 
router.get('/empresas', function(req, res){    res.render('empresas');}); 
router.get('/empresas', empresasController.list); 
router.get('/emplistV/:det', empresasController.listVarios);
router.get('/empresas/:id', empresasController.listOne);
router.post('/empadd', empresasController.save);
router.put('/empadd/:id', empresasController.update);
router.get('/empdelete/:id', empresasController.delete);


// tipo de productos
router.get('/tplist', tipoController.list);
router.get('/tipo', function(req, res){ res.render('tipos');});
router.get('/tipos/:det', tipoController.listVarios);
router.get('/tipo/:id', tipoController.listOne);
router.get('/tipoqry', tipoController.listQuery);
router.get('/tipoPortal/:id', tipoController.listPortal);
router.post('/tpadd', tipoController.save);
router.put('/tpadd/:id', tipoController.update);
router.get('/tpdelete/:id', tipoController.delete);

// rutas para productos 
router.get('/prolist', productosController.list); 
router.get('/productos', function(req, res){    res.render('productos');}); 
router.get('/prodPortal/:llave', productosController.listPortal); 
router.get('/prolistV/:det', productosController.listVarios);
router.get('/productos/:id', productosController.listOne);
router.post('/proadd', productosController.save);
router.put('/proadd/:id', productosController.update);
router.get('/prodelete/:id', productosController.delete);
//router.get('/subirlogo', function(req, res){    res.render('productos');}); 
router.get('/producPromo/:cod', productosController.propuctosPromocion); 
router.get('/tipoproductosQry', productosController.tipoproductosQuery);
router.get('/productosQry/:det', productosController.productosQuery);

// rutas para clientes
router.get('/clilist', clientesController.list); 
router.get('/clientes', function(req, res){    res.render('clientes');}); 
router.get('/clientes', clientesController.list); 
router.get('/clilistV/:det', clientesController.listVarios);
router.get('/clientes/:id', clientesController.listOne);
router.post('/cliadd', clientesController.save);
router.put('/cliadd/:id', clientesController.update);
router.get('/clidelete/:id', clientesController.delete);

// rutas para usuarios
router.get('/usulist', usuariosController.list); 
router.get('/usuarios', function(req, res){    res.render('usuarios');}); 
router.get('/usuarios', usuariosController.list); 
router.get('/usulistV/:det', usuariosController.listVarios);
router.get('/usuarios/:id', usuariosController.listOne);
router.post('/usuadd', usuariosController.save);
router.put('/usuadd/:id', usuariosController.update);
router.get('/usudelete/:id', usuariosController.delete);

router.get('/', customerController.inicio);
router.get('/admin', customerController.admin);
router.post('/autentica', customerController.autentica);
router.get('/pendiente', function(req, res){ res.render('pendiente');});
router.get('/promociones', function(req, res){ res.render('promociones');});
router.get('/contact', function(req, res){res.render('contact');});
router.get('/index', function(req, res){ res.render('index');});

router.get('/load', function(req, res){ res.render('loadImg');});
router.get('/combo', function(req, res){ res.render('combo');});

router.get('/menu', function(req, res){res.send('root');});

//  Portal
router.get('/portal0', customerController.portal0);

//  lo que traia de antes ... bara borrarlo ???
router.get('/list', customerController.list);
router.post('/add', customerController.save);
router.get('/delete/:id', customerController.delete);
router.put('/add', customerController.save);
router.get('/:id', customerController.listOne);
router.post('/upload', customerController.upload);

module.exports = router;