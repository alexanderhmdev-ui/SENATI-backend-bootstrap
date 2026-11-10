const { Router } = require('express') //Manejador de rutas
const controller = require('../controllers/producto.controller') //controlador logica

const router = Router() //considerar los verbos

router.get('/', controller.listarProductos)
router.get('/:id', controller.obtenerProductos)
router.post('/', controller.crearProductos)
router.put('/:id', controller.actualizarProductos)
// pendiente puy post delete 

module.exports = router