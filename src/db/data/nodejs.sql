CREATE DATABASE  IF NOT EXISTS `nodejs` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `nodejs`;
-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: nodejs
-- ------------------------------------------------------
-- Server version	5.7.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cl_idEmpresa` int(11) DEFAULT NULL,
  `cl_tipoDocumento` varchar(1) DEFAULT NULL,
  `cl_documentoId` varchar(10) DEFAULT NULL,
  `cl_nombre` varchar(60) DEFAULT NULL,
  `cl_telefono` varchar(20) DEFAULT NULL,
  `cl_email` varchar(100) DEFAULT NULL,
  `cl_direccion` varchar(100) DEFAULT NULL,
  `cl_ciudad` varchar(60) DEFAULT NULL,
  `cl_zona` varchar(60) DEFAULT NULL,
  `cl_localidad` varchar(60) DEFAULT NULL,
  `cl_barrio` varchar(60) DEFAULT NULL,
  `cl_genero` varchar(1) DEFAULT NULL,
  `cl_estado` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cl_idEmpresa` (`cl_idEmpresa`),
  CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`cl_idEmpresa`) REFERENCES `empresas` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (3,1,'C','38','Alvaro','311','aoc@com.co','Cll 54','Bta','Norte','Tesa','Paulo','M','A'),(5,1,'C','45877','Carmen','2524256','carmen@com.co','Cll 88','Bta','Norte','Suba','Chia','F','A'),(6,1,'C','12445','Juliana','3465','a1@com','cr 45','cali','norte','chia','chia','M','A'),(7,1,'C','123','Luis','3174142133','alvaro.oycsoft@gmail.com','Av 12','chia','los','cms','pah','M','A'),(8,1,'C','456','los asa','4324','a2@com','avenida 3 Nro 44-55','Ibague','o','p','El cairo','M','A'),(9,1,'C','8544','Mark','45','m@co','direcc','city','nortes','localiza','barriadas','F','A'),(10,1,'C','2468','Jose','2154455','aoc@com.co','Cl 87 # 44-443','Bta','','','no se','M','');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customex`
--

DROP TABLE IF EXISTS `customex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customex` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `empresa` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customex`
--

LOCK TABLES `customex` WRITE;
/*!40000 ALTER TABLE `customex` DISABLE KEYS */;
INSERT INTO `customex` VALUES (8,'Santander','clle 45','3174142133',1),(3,'jose','cr44','565',1),(6,'Juliana Carmenza','4888q','455-3',1),(7,'Ciro Pérez','Av Embajador','777 4555555',1),(9,'Berta de la Paz','Calle 45','6767',1),(10,'Pedro','cra54','1234',1),(11,'Juan','av 45','65465',1),(12,'Juan','cra54','127734',1),(13,'Felippy Dias','av 45','6588465',1),(14,'Carlos','cra54','127734',1),(15,'Josefa','av 45','6588465',1),(16,'Mariana','cra54','127734',1),(17,'Carmenza Bejarano','av 45 # 55-67','6588465',1),(18,'Federico Romero','cra54 H 88-99','127734',1),(19,'Juliana','av 45','6588465',1),(20,'Diosa Corazon','cra54','127734',1),(21,'Andrés Felipe','av 45','6588465',1),(22,'Claudia Marcela','cra54','127734',1),(23,'Deysi','av 45','6588465',1),(24,'Katty','cra54','127734',1),(25,'Lilia maria','av 45','6588465',1),(26,'Fernando','cra54','127734',1),(27,'Ortiga','av 45','6588465',1),(28,'Pedrina Marcela','cra54','127734',1),(29,'Carmen sofia ','av 45','6588465',1),(30,'Alba Lucía','cra 12','46546',1),(33,'Alberto','cra 12','46546',1),(34,'Alejo','cra 12','46546',1),(36,'Ajo y cabolla picada con jugos','cra 12','46546',1),(37,'Arcadio','dir','4588',1),(42,'Bartolome Suarez','dr 45 77','4522()88',1);
/*!40000 ALTER TABLE `customex` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empresas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `em_nombre` varchar(100) DEFAULT NULL,
  `em_direccion` varchar(100) DEFAULT NULL,
  `em_zona` varchar(60) DEFAULT NULL,
  `em_localidad` varchar(60) DEFAULT NULL,
  `em_barrio` varchar(60) DEFAULT NULL,
  `em_nit` varchar(20) DEFAULT NULL,
  `em_telefono` varchar(60) DEFAULT NULL,
  `em_email` varchar(100) DEFAULT NULL,
  `em_usuario` varchar(20) DEFAULT NULL,
  `em_sloganppal` varchar(100) DEFAULT NULL,
  `em_slogansec` varchar(100) DEFAULT NULL,
  `em_negocio` varchar(1) DEFAULT NULL,
  `em_observaciones` varchar(255) DEFAULT NULL,
  `em_autentica` varchar(1) DEFAULT NULL,
  `em_ciudad` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (1,'EMPRESA DE PRUEBAS SAS','Cra 54 # 55-44','norte al norte','teusquillo','pablo VI','132','87','mi@com','A','LAS PRUEBAS BIEN HECHAS','Dejan unos resultados visibles !!!','C','No hay mas que decir y punto','M','Bogotá');
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `im_idEmpresa` int(11) DEFAULT NULL,
  `im_tipoProductoId` int(11) DEFAULT NULL,
  `im_productoId` int(11) DEFAULT NULL,
  `im_tipo` char(1) DEFAULT NULL,
  `im_imagen` varchar(100) DEFAULT NULL,
  `im_titulo` varchar(45) DEFAULT NULL,
  `im_descripcion` text,
  `im_estado` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
INSERT INTO `imagenes` VALUES (6,1,8,1,'P','CUCU001.png','Relojes','RELOJ DE PULSO BARATO','A'),(7,1,10,2,'P','CUCU002.jpg','Relojes','RELOJ ANALOGO DE PULSO','A'),(8,1,10,3,'P','CUCU003.jpg','Relojes','RELOJ PARA HOMBRE DE PULSO METALICO','A'),(9,1,12,4,'P','Gales.jpg','Relojes','Especial','A'),(10,1,2,5,'P','icon.png','Relojes','pruebas de cubiertas','A'),(12,1,12,4,'G','car1.jpg','Carrito','detalles del carrito','A'),(13,1,2,5,'G','mar.jpg','Imagen 01','Detalle 1 de la imagen 1','A'),(14,1,2,5,'G','mar2.png','Imagen 02','Detalle 2 de la imagen 1','A'),(15,1,2,5,'G','mar3.jpg','Imagen 03','Detalle 3 de la imagen 1','A'),(16,1,2,5,'G','mar4.jpg','Imagen 04','Detalle 4 de la imagen 1','A'),(17,1,2,5,'G','mar5.jpg','Imagen 05','Detalle 5 de la imagen 1','A'),(18,1,2,5,'G','mar8.jpg','Imagen 08','Detalle 8 de la imagen 1','A'),(19,1,2,5,'G','mar7.jpg','Imagen 07','Detalle 7 de la imagen 1','A'),(20,1,8,1,'P','cafe8.jpg','cafe 08','Detalle 8 de la imagen cafe','A'),(21,1,8,1,'G','cafe7.jpg','cafe 07','Detalle 7 de la imagen cafe','A'),(22,1,8,1,'G','cafe6.jpg','cafe 06','Detalle 6 de la imagen cafe','A'),(23,1,8,1,'G','cafe5.jpg','cafe 05','Detalle 5 de la imagen cafe','A'),(24,1,8,1,'G','cafe4.jpg','cafe 04','Detalle 4 de la imagen cafe','A'),(25,1,8,1,'G','cafe3.jpg','cafe 03','Detalle 3 de la imagen cafe','A'),(26,1,8,1,'G','cafe2.jpg','cafe 02','Detalle 2 de la imagen cafe','A'),(27,1,8,1,'G','cafe1.jpg','cafe 01','Detalle 1 de la imagen cafe','A');
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parametros`
--

DROP TABLE IF EXISTS `parametros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parametros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pm_idEmpresa` int(11) DEFAULT NULL,
  `pm_representante` varchar(45) DEFAULT NULL,
  `pm_web` varchar(45) DEFAULT NULL,
  `pm_email` varchar(45) DEFAULT NULL,
  `pm_banco` varchar(45) DEFAULT NULL,
  `pm_cuenta` varchar(20) DEFAULT NULL,
  `pm_tipocuenta` char(1) DEFAULT NULL,
  `pm_logo` varchar(45) DEFAULT NULL,
  `pm_consecpedido` varchar(10) DEFAULT NULL,
  `pm_consecfactura` varchar(10) DEFAULT NULL,
  `pm_whatsapp` varchar(60) DEFAULT NULL,
  `pm_facebook` varchar(60) DEFAULT NULL,
  `pm_instagram` varchar(60) DEFAULT NULL,
  `pm_twitter` varchar(60) DEFAULT NULL,
  `pm_valordespacholocal` decimal(12,2) DEFAULT NULL,
  `pm_valordespachonacional` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parametros`
--

LOCK TABLES `parametros` WRITE;
/*!40000 ALTER TABLE `parametros` DISABLE KEYS */;
INSERT INTO `parametros` VALUES (2,1,'Alberto','www.eltiempo.com','alvarobucaros@hotmail.com','BanColombia','101004585-2','A','prueba1.jpg','PD00000000','FC00000000','yubr','fbk','ingr','twi',NULL,NULL);
/*!40000 ALTER TABLE `parametros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidodetalle`
--

DROP TABLE IF EXISTS `pedidodetalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedidodetalle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `det_pedidoId` int(11) DEFAULT NULL,
  `det_productoid` int(11) DEFAULT NULL,
  `det_cantidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidodetalle`
--

LOCK TABLES `pedidodetalle` WRITE;
/*!40000 ALTER TABLE `pedidodetalle` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidodetalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ped_numero` varchar(12) DEFAULT NULL,
  `ped_fecha` datetime DEFAULT NULL,
  `ped_clienteId` int(11) DEFAULT NULL,
  `ped_medioPago` varchar(45) DEFAULT NULL,
  `ped_estado` char(1) DEFAULT NULL,
  `ped_nroFactura` varchar(12) DEFAULT NULL,
  `ped_fechaFactura` datetime DEFAULT NULL,
  `ped_vlrFactura` decimal(12,2) DEFAULT NULL,
  `ped_vlrIva` decimal(12,2) DEFAULT NULL,
  `ped_vlrNeto` decimal(12,2) DEFAULT NULL,
  `ped_refPago` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pr_idEmpresa` int(11) DEFAULT NULL,
  `pr_idTipo` varchar(50) DEFAULT NULL,
  `pr_codigo` varchar(50) DEFAULT NULL,
  `pr_descipcion` text,
  `pr_foto` varchar(100) DEFAULT NULL,
  `pr_titulo` varchar(400) DEFAULT NULL,
  `pr_diasVenta` varchar(20) DEFAULT NULL,
  `pr_precio` decimal(10,2) DEFAULT NULL,
  `pr_inventario` int(11) DEFAULT NULL,
  `pr_existencias` int(11) DEFAULT NULL,
  `pr_descPesos` decimal(12,2) DEFAULT NULL,
  `pr_descPorcentaje` decimal(6,2) DEFAULT NULL,
  `pr_iva` int(11) DEFAULT NULL,
  `pr_marca` varchar(45) DEFAULT NULL,
  `pr_referencia` varchar(45) DEFAULT NULL,
  `pr_estado` varchar(1) DEFAULT NULL,
  `pr_tipoproductoId` int(11) DEFAULT NULL,
  `pr_ofertaDesde` date DEFAULT NULL,
  `pr_ofertaHasta` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pr_idEmpresa` (`pr_idEmpresa`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`pr_idEmpresa`) REFERENCES `empresas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,1,'LICORES','TINTO','Cafe colombiano suave cultivado en la sierra de Santa Martha a 1400 mts sobre el nivel del mar, es producido con café tipo exportación secado y tostado de manera artesanal','cafe1.jpg','SUAVE COLOMBIA','T',1500.00,0,0,0.00,0.00,11,'CUCU','R900','A',8,'2020-06-01','2020-12-31'),(2,1,'RELOJES','CUCU02','RELOJ ANALOGO DE PULSO','CUCU002.jpg',NULL,'T',85000.00,0,0,0.00,0.00,19,'CUCU','AS32','A',10,'2020-06-01','2020-10-30'),(3,1,'RELOJES','CUCU03','RELOJ PARA HOMBRE DE PULSO METALICO','CUCU003.jpg',NULL,'T',55000.00,0,0,0.00,0.00,19,'CUCU','AU32','A',10,'2020-06-01','2020-12-01'),(4,1,'CARRITOS','JAWA','Jawaco especial en acero','electro1.jpg',NULL,'T',80000.00,10,5,0.00,0.00,12,'Marcado','FG99','A',12,'2020-11-11','2020-12-31'),(5,1,'JUEGOS','Juegos de PC','Aplicaciones para PC y celular','mar.jpg',NULL,'T',80000.00,0,0,0.00,0.00,16,'Product','FUGA','A',2,'2020-06-01','2020-12-31'),(6,1,'POSTRES','Tortas','Tortas y ponques en porciones individuales o la unidad completa de 12 porciones, sabores sutidos en torta blanca o tora de chocolate, o browni','postre.jpg','TORTAS','T',5000.00,0,0,0.00,15.00,16,'TOTO','T01','A',11,'2020-06-15','2020-11-01'),(7,1,'POSTRES','Postres','Postres frescos bajo en grasa y en azúcar','bizco.jpg','POSTRES','T',5000.00,0,0,0.00,0.00,0,'SIN','SIN','A',11,'2020-01-01','2020-12-31'),(8,1,'RELOJES','INVICTA','Relojería Invicta fina','dama.jpg',NULL,'T',12000.00,0,0,0.00,0.00,0,'SIN','SIN','A',11,'2020-01-31','2020-12-31'),(9,1,'FLORES','FLORES','Estas plantas tiene una edad jóven, aproximadamente 6 meses, s están sembradas en cascajo de pino ','flor.jpg','CATLEYA ROSA','T',56000.00,0,0,0.00,10.00,0,'SIN','SIN','A',10,'2020-01-01','2020-12-31'),(10,1,'LICORES','CAFE','Cafe con crema de leche','cafe2.jpg','CAFE Y CREMA','T',2200.00,0,0,0.00,0.00,11,'CUCU','R900','A',8,'2020-06-01','2020-12-31'),(11,1,'LICORES','MOCACHINO','Cafe colombiano  con chocolate en polvo Moka','cafe5.jpg','CAFE CACAO','T',2500.00,0,0,0.00,0.00,11,'CUCU','R900','A',8,'2020-06-01','2020-12-31'),(12,1,'LICORES','CAPUCHINO','Cafe colombiano suave malteado con pizcas de chocolate caucano','cafe6.jpg','CAFE ITALIANO','T',3200.00,0,0,0.00,0.00,11,'CUCU','R900','A',8,'2020-06-01','2020-12-31'),(13,1,'LICORES','CARAJILLO','Cafe colombiano suave con un toque de aguardiente de caña','cafe4.jpg','CAFE LICOR','T',2800.00,0,0,0.00,0.00,11,'CUCU','R900','A',8,'2020-06-01','2020-12-31');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pruebas`
--

DROP TABLE IF EXISTS `pruebas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pruebas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pr_codigo` varchar(10) DEFAULT NULL,
  `pr_detalle` varchar(45) DEFAULT NULL,
  `pr_estado` char(1) DEFAULT NULL,
  `pr_radios` char(1) DEFAULT NULL,
  `pr_hoy` date DEFAULT NULL,
  `pr_check` char(1) DEFAULT NULL,
  `pr_texto` text,
  `pr_password` varchar(45) DEFAULT NULL,
  `pr_email` varchar(45) DEFAULT NULL,
  `pr_listaDespl` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pruebas`
--

LOCK TABLES `pruebas` WRITE;
/*!40000 ALTER TABLE `pruebas` DISABLE KEYS */;
INSERT INTO `pruebas` VALUES (2,'COOL','NMy Bueno','A','1','2020-04-30','0','Texts','123','com@com','Lista'),(5,'W','W','W','0','2020-08-14','1','W','W','W','W');
/*!40000 ALTER TABLE `pruebas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoproductos`
--

DROP TABLE IF EXISTS `tipoproductos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipoproductos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tp_idEmpresa` int(11) DEFAULT NULL,
  `tp_codigo` varchar(50) DEFAULT NULL,
  `tp_descipcion` varchar(255) DEFAULT NULL,
  `tp_estado` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoproductos`
--

LOCK TABLES `tipoproductos` WRITE;
/*!40000 ALTER TABLE `tipoproductos` DISABLE KEYS */;
INSERT INTO `tipoproductos` VALUES (2,1,'JUEGOS','Reloj Rolex','A'),(4,1,'FLORES','Relojes Omega Originales y Garantizados','A'),(8,1,'LICORES','Relojería Invicta','A'),(10,1,'RELOJES','Relojes Musicales muy economicos','A'),(11,1,'POSTRES','La momposina ','I'),(12,1,'CARRITOS','Relojes de Pared','A');
/*!40000 ALTER TABLE `tipoproductos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `us_idEmpresa` int(11) DEFAULT NULL,
  `us_nombre` varchar(100) DEFAULT NULL,
  `us_email` varchar(100) DEFAULT NULL,
  `us_direccion` varchar(100) DEFAULT NULL,
  `us_zona` varchar(60) DEFAULT NULL,
  `us_localidad` varchar(60) DEFAULT NULL,
  `us_barrio` varchar(60) DEFAULT NULL,
  `us_docTipo` char(1) DEFAULT NULL,
  `us_docNumero` varchar(20) DEFAULT NULL,
  `us_telefono` varchar(100) DEFAULT NULL,
  `us_clave` varchar(100) DEFAULT NULL,
  `us_estado` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `us_idEmpresa` (`us_idEmpresa`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`us_idEmpresa`) REFERENCES `empresas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,1,'Tomas Ignacio Acosta','tia@com','cra 5','n','t','b','C','123','123','900150983cd24fb0d6963f7d28e17f72','A'),(2,1,'Alvaro Ortiz','aoc@com','cra 6','norte','chapinero','Nogal','C','898779','3174140000','d07c65135b3478e63420aa39b1b028b9','A'),(3,1,'Juan Carlos Piña','juan@com','dirc','zon','loc','bar','C','4564','987','202cb962ac59075b964b07152d234b70','A');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-18 10:56:23
