PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

DROP TABLE IF EXISTS clientes;

CREATE TABLE IF NOT EXISTS clientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  cl_idEmpresa INTEGER  NULL,
  cl_tipoDocumento varchar(1)  NULL,
  cl_documentoId varchar(10)  NULL,
  cl_nombre varchar(60)  NULL,
  cl_telefono varchar(20)  NULL,
  cl_email varchar(100)  NULL,
  cl_direccion varchar(100)  NULL,
  cl_ciudad varchar(60)  NULL,
  cl_zona varchar(60)  NULL,
  cl_localidad varchar(60)  NULL,
  cl_barrio varchar(60)  NULL,
  cl_genero varchar(1)  NULL,
  cl_estado varchar(1)  NULL
);

INSERT INTO clientes VALUES (3,1,'C','38','Alvaro','311','aoc@com.co','Cll 54','Bta','Norte','Tesa','Paulo','M','A'),
(5,1,'C','45877','Carmen','2524256','carmen@com.co','Cll 88','Bta','Norte','Suba','Chia','F','A'),
(6,1,'C','12445','Juliana','3465','a1@com','cr 45','cali','norte','chia','chia','M','A'),
(7,1,'C','123','Luis','3174142133','alvaro.oycsoft@gmail.com','Av 12','chia','los','cms','pah','F','A'),
(8,1,'C','456','los asa','4324','a2@com','a','i','o','p','hilo','M','A'),
(9,1,'C','8544','Mark','45','m@co','direcc','city','nortes','localiza','barriadas','F','A');


DROP TABLE IF EXISTS empresas;

CREATE TABLE IF NOT EXISTS empresas (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  em_nombre varchar(100)  NULL,
  em_direccion varchar(100)  NULL,
  em_zona varchar(60)  NULL,
  em_localidad varchar(60)  NULL,
  em_barrio varchar(60)  NULL,
  em_nit varchar(20)  NULL,
  em_telefono varchar(60)  NULL,
  em_email varchar(100)  NULL,
  em_usuario varchar(20)  NULL,
  em_sloganppal varchar(100)  NULL,
  em_slogansec varchar(100)  NULL,
  em_negocio varchar(1)  NULL,
  em_observaciones varchar(255)  NULL,
  em_autentica varchar(1)  NULL,
  em_ciudad varchar(45)  NULL
) ;

INSERT INTO empresas VALUES (1,'EMPRESA DE PRUEBAS SAS','Cra 54 # 55-44','norte','teusquillo','pablo VI','132','87','mi@com','A','LAS PRUEBAS BIEN HECHAS','Dejan unos resultados visibles !!!','C','No hay mas que decir y punto','M','Bogotá');

DROP TABLE IF EXISTS imagenes;

CREATE TABLE imagenes (
 id INTEGER PRIMARY KEY AUTOINCREMENT, 
  im_idEmpresa INTEGER  NULL,
  im_producto varchar(45)  NULL,
  im_ruta varchar(45)  NULL,
  im_descripcion text
) ;

DROP TABLE IF EXISTS parametros;

CREATE TABLE parametros (
 id INTEGER PRIMARY KEY AUTOINCREMENT, 
  pm_idEmpresa INTEGER  NULL,
  pm_representante varchar(45)  NULL,
  pm_web varchar(45)  NULL,
  pm_email varchar(45)  NULL,
  pm_banco varchar(45)  NULL,
  pm_cuenta varchar(20)  NULL,
  pm_tipocuenta char(1)  NULL,
  pm_logo varchar(45)  NULL,
  pm_consecpedido varchar(10)  NULL,
  pm_consecfactura varchar(10)  NULL,
  pm_whatsapp varchar(60)  NULL,
  pm_facebook varchar(60)  NULL,
  pm_instagram varchar(60)  NULL,
  pm_twitter varchar(60)  NULL,
  pm_valordespacholocal decimal(12,2)  NULL,
  pm_valordespachonacional decimal(12,2)  NULL
); 

INSERT INTO parametros VALUES (2,1,'Alberto','www.eltiempo.com','alvarobucaros@hotmail.com','BanColombia','101004585-2','A','mujer2.png','PD00000000','FC00000000','yubr','fbk','ingr','twi',NULL,NULL);

DROP TABLE IF EXISTS pedidos;

CREATE TABLE pedidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  ped_numero varchar(12)  NULL,
  ped_fecha datetime  NULL,
  ped_clienteId INTEGER  NULL,
  ped_referencia1 varchar(45)  NULL,
  ped_estado char(1)  NULL,
  ped_nrofactura varchar(12)  NULL,
  ped_fechaFactura datetime  NULL,
  ped_vlrDespacho varchar(45)  NULL,
  ped_valoProdectos varchar(45)  NULL,
  ped_vlrIva varchar(45)  NULL
) ;

DROP TABLE IF EXISTS pedidodetalle;

CREATE TABLE pedidodetalle (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  det_pedidoId INTEGER  NULL,
  det_productoid INTEGER  NULL,
  det_cantidad INTEGER  NULL,  
  FOREIGN KEY (det_pedidoId)
       REFERENCES pedidos (id) ,
 FOREIGN KEY (det_productoid)
       REFERENCES productos (id)
);

DROP TABLE IF EXISTS productos;

CREATE TABLE productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  pr_idEmpresa INTEGER  NULL,
  pr_idTipo varchar(50)  NULL,
  pr_codigo varchar(50)  NULL,
  pr_descipcion text,
  pr_foto varchar(100)  NULL,
  pr_diasVenta varchar(20)  NULL,
  pr_precio decimal(10,2)  NULL,
  pr_inventario INTEGER  NULL,
  pr_existencias INTEGER  NULL,
  pr_descPesos decimal(12,2)  NULL,
  pr_descPorcentaje decimal(6,2)  NULL,
  pr_iva INTEGER  NULL,
  pr_marca varchar(45)  NULL,
  pr_referencia varchar(45)  NULL,
  pr_estado varchar(1)  NULL,
  pr_tipoproductoId INTEGER NOT NULL,
    FOREIGN KEY (pr_tipoproductoId)
       REFERENCES tipoproductos (id)
);

INSERT INTO productos VALUES (1,1,'CUCU','CUCU01','RELOJ DE PULSO BARATO','CUCU001.png','0',50000.00,0,0,5000.00,0.00,19,'CUCU','R900','A',10),(2,1,'CUCU','CUCU02','RELOJ ANALOGO DE PULSO','CUCU002.jpg','0',85000.00,0,0,8500.00,0.00,19,'CUCU','AS32','A',10),(3,1,'CUCU','CUCU03','RELOJ PARA HOMBRE DE PULSO','CUCU003.jpg','0',55000.00,0,0,1100.00,0.00,19,'CUCU','AU32','A',10);


DROP TABLE IF EXISTS tipoproductos;

CREATE TABLE tipoproductos (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  tp_idEmpresa INTEGER  NULL,
  tp_codigo varchar(50)  NULL,
  tp_descipcion varchar(255)  NULL,
  tp_estado varchar(1)  NULL
);
INSERT INTO tipoproductos VALUES (2,1,'ROLEX','Reloj Rolex','A'),(4,1,'OMEGA','Relojes Omega','A'),(8,1,'INVICTA','Relojería Invicta','A'),(10,1,'CUCU','Relojes Musicales muy economicos','A'),(11,1,'TOTO','La momposina ','I'),(12,1,'JAWACO','Relojes de Pared','A');

DROP TABLE IF EXISTS usuarios;


CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  us_idEmpresa INTEGER  NULL,
  us_nombre varchar(100)  NULL,
  us_email varchar(100)  NULL,
  us_direccion varchar(100)  NULL,
  us_zona varchar(60)  NULL,
  us_localidad varchar(60)  NULL,
  us_barrio varchar(60)  NULL,
  us_docTipo char(1)  NULL,
  us_docNumero varchar(20)  NULL,
  us_telefono varchar(100)  NULL,
  us_clave varchar(100)  NULL,
  us_estado char(1)  NULL
);

INSERT INTO usuarios VALUES (1,1,'Toma Ignacio Acosta','tia@com','cra 5','n','t','b','C','123','123','123','A'),(2,1,'aoc','aoc@com','cra 6','norte','chapinero','Nogal','C','898779','3174140000','123','A');

COMMIT;