const { Router } = require('express') //Manejador de rutas
const controller = require('../controllers/producto.controller') //controlador logica

const router = Router() //considerar los verbos

router.get('/', controller.listarProductos)
router.get('/:id', controller.obtenerProductos)

// pendiente puy post delete 

module.exports = router