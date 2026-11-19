# API REST — Tienda Perú

API REST desarrollada con **Node.js**, **Express** y **MySQL** para gestionar y compartir los datos de los módulos de **productos**, **clientes** y **proveedores** de la base de datos de Tienda Perú.

---

## Tecnologías

* **Entorno de ejecución:** Node.js (v20 o superior)
* **Framework:** Express 5
* **Base de datos:** MySQL (`mysql2`)
* **Variables de entorno:** `dotenv`
* **Desarrollo:** `nodemon`
* **Pruebas de endpoints:** Postman (o cualquier cliente REST similar)

---

## Estructura del proyecto

```text
api-productos/
├── database/
│   └── db.sql               # Script de la BD (tablas + registros de prueba)
├── src/
│   ├── config/
│   │   ├── env.js           # Carga y validación de variables de entorno
│   │   └── database.js      # Configuración del pool de conexión MySQL
│   ├── controllers/         # Lógica de negocio (producto, cliente, proveedor)
│   ├── routes/              # Definición de rutas + index.js
│   ├── app.js               # Configuración de middlewares y Express
│   └── server.js            # Punto de entrada y arranque del servidor
├── .env                     # Variables de entorno (no subir al repositorio)
├── .env.example             # Plantilla de configuración
└── package.json
```

---

## Requerimientos previos

* Tener instalado **Node.js v20 o superior**.
* Contar con acceso a Internet para descargar las dependencias del proyecto.
* Tener un servidor **MySQL** activo (Laragon, XAMPP, MySQL Workbench o servicio nativo).
* Tener instalado **Postman** (o Thunder Client / Insomnia) para probar las peticiones HTTP.

---

## Instalación y configuración

### 1. Clonar el repositorio e instalar dependencias

```bash
git clone [https://github.com/TU_USUARIO/api-productos.git](https://github.com/TU_USUARIO/api-productos.git)
cd api-productos
npm install
```

### 2. Configurar variables de entorno (`.env`)

Crea un archivo `.env` en la raíz del proyecto (puedes tomar como base `.env.example`) y completa tus credenciales privadas:

```env
PORT=3000
DB_HOST=********
DB_PORT=****
DB_USER=********
DB_PASSWORD=********
DB_NAME=********
DB_CONNECTION_LIMIT=10
```

> **