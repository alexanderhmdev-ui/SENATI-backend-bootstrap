//nuestra app puede tener muchos modulos:
//Productos > producto.controller > producto routes
//Proveedores > proveedor.controller > proveedor.routes
//Clientes > clientes.controller > cliente.routes

//Todas las rutas se organizan gracias al index.js 
const { Router, Router} = require('express')

//Esto se realiza por cada ruta 
const productoRoutes = require('./producto.routes')

//Esto es solo uno para todas las rutas 
const router = Router()

//Estp es por cada routes
router.use('/productos', productoRoutes)

//Se exportan todas las rutas
module.exports = router