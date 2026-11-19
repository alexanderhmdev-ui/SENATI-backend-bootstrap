API REST
Sistema para compartir datos de tienda Peru
Requerimientos

instalacion nodejs(v20 o superior)
Acceso a internet (instalar dependencia)
Clone al repositorio, y ejecute npminstall
Requerimos el archivo _.env_
PORT=3000
DB_HOST=
DB_PORT=3306
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_CONNECTION_LIMIT=10
Necesitamos la tabla productos
CREATE TABLE IF NOT EXISTS productos (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(100) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    precio VARCHAR(100) NOT NULL,
    stock VARCHAR(100) NOT NULL DEFAULT 0,
    create_at DATETIME NOT NULL DEFAULT NOW(),
    update_at DATETIME NULL
) ENGINE=INNODB;
Ejecutar el proyetco escribiendo : node src/server
Utlice Postman Descargar_Postman o cualquier softwrae similar pra realizar el TEST
API REST hecha con Node.js + Express + MySQL que administra los módulos de productos, clientes y proveedores de la base de datos tiendaperu.

Tecnologías
Node.js · Express 5 · mysql2 · dotenv · nodemon (desarrollo)

Estructura
database/db.sql              -> script de la BD (3 tablas + 3 registros de prueba c/u)
src/config/                  -> env.js (variables) y database.js (conexión MySQL)
src/controllers/             -> producto / cliente / proveedor .controller.js
src/routes/                  -> producto / cliente / proveedor .routes.js + index.js
src/app.js                   -> configuración de Express
src/server.js                -> arranque del servidor
Instalación y ejecución
Clonar: git clone https://github.com/TU_USUARIO/api-productos.git y entrar a la carpeta.
Instalar dependencias: npm install
Crear la base de datos: importar database/db.sql en MySQL (phpMyAdmin / Workbench / mysql -u root < database/db.sql).
Crear el archivo .env en la raíz (puede copiarse de .env.example):
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=tiendaperu
DB_CONNECTION_LIMIT=10
Ejecutar: npm run dev (con nodemon) o npm start.
Abrir http://localhost:3000/ → debe mostrar "API REST ejecutandose correctamente".