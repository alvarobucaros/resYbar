# Aplicacion de venta electrónica

# Que utiliza?

MySql Como base de datos 

axios.js para el acceso a datos del servidor desde el cliente 

Vuejs para manejo de interfaz de usuario (versión 2)

ejs es el formato de los formularios que se encuentran en la carpeta views
 
# mi estructura
controlles 		controladoras para acceder apis.

db/data			script para crear la base de datos de pruebas en MySql  o para Sqlite3,
                esta ultima no está habilitada en una futura versión será la de uso por defecto

db/models		script para crear esquema de MySql en blanco con una empresa de pruebas y el usuario admin/admin@com *Esto está en desarrollo*

databaseMysql.js Acceso a la base de MySql 

views			Vistas en .ejs de la aplicación

views/partials	Menú, header y footer de las vistas

routes			Rutas de acceso a las opciones

public/css		Estilos

public/ctrl		Datos y metodos de las vistas

public/js		Archivos js usados en la aplicación 

# instalación

Una vez descargada debe ejecutar el comando

npm install

Para ejecutarlo emplee

npm run dev

# ejecución

Se ejecuta en el puerto  http://localhost:8000 y presenta la ventana de venta electrónica

http://localhost:8000/admin permite el ingreso al módulo de administración de la aplicación, el usuario puede ser:

tia@com y la contraseña 123  

aoc@com y contraseña 123

juan@com y contraseña 123

implementado con md5 para cifrar la clave

