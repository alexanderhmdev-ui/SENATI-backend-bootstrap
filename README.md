# API REST - Tienda Perú (`api-productos`)

Servicio Backend desarrollado con **Node.js**, **Express** y **MySQL** para la gestión CRUD de **Productos**, **Clientes** y **Proveedores** sobre la base de datos `tiendaperu`.

## Estructura del Proyecto

```text
├── database/
│   └── db.sql
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── env.js
│   ├── controllers/
│   │   ├── cliente.controller.js
│   │   ├── producto.controller.js
│   │   └── proveedor.controller.js
│   ├── routes/
│   │   ├── cliente.routes.js
│   │   ├── index.js
│   │   ├── producto.routes.js
│   │   └── proveedor.routes.js
│   ├── app.js
│   └── server.js
├── .gitignore
├── package.json
└── README.md
```

## Instalación y Configuración

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/alexanderhmdev-ui/SENATI-backend_js.git
   cd SENATI-backend_js
   ```

2. Reconstruir la carpeta `node_modules`:
   ```bash
   npm install
   ```

3. Crear manualmente el archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   # Servidor
   PORT=3000

   # Base de datos MySQL
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=tiendaperu
   DB_CONNECTION_LIMIT=10
   ```

4. Ejecutar el script `database/db.sql` en MySQL para crear la base de datos `tiendaperu`, las tablas (`productos`, `clientes`, `proveedores`) y sus registros de prueba.

5. Ejecutar el servidor:
   ```bash
   npm start
   ```
   *(O en modo desarrollo con `npm run dev`)*

## Endpoints de la API

### Productos (`/api/productos`)
- `GET /api/productos` — Listar todos los productos
- `GET /api/productos/:id` — Obtener un producto por ID
- `POST /api/productos` — Registrar un nuevo producto
- `PUT /api/productos/:id` — Actualizar un producto existente
- `DELETE /api/productos/:id` — Eliminar un producto

### Clientes (`/api/clientes`)
- `GET /api/clientes` — Listar todos los clientes
- `GET /api/clientes/:id` — Obtener un cliente por ID
- `POST /api/clientes` — Registrar un nuevo cliente
- `PUT /api/clientes/:id` — Actualizar un cliente existente
- `DELETE /api/clientes/:id` — Eliminar un cliente

### Proveedores (`/api/proveedores`)
- `GET /api/proveedores` — Listar todos los proveedores
- `GET /api/proveedores/:id` — Obtener un proveedor por ID
- `POST /api/proveedores` — Registrar un nuevo proveedor
- `PUT /api/proveedores/:id` — Actualizar un proveedor existente
- `DELETE /api/proveedores/:id` — Eliminar un proveedor
