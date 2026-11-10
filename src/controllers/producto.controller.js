//Este archivo contiene la logica de la aplicación
//5 procedimientos: buscar, listar, registrar, actualizar, eliminar

//Paso 1
//const objeto= requiere() //Todas las funciones 
//const { otroObjeto } = require('') // Solo algunas funciones
const { pool } = require('../config/database')
const CAMPOS = 'id, marca, descripcion, precio, stock' //dato comun

//Todas las funciones seran asincronas (tardaran un tiempo en ser resueltas...)
//milisegundos, segundos (1000 = 1seg)
//Todas las funciones reciben y envian datos (pasarelas)
const listarProductos = async(req, res) => { }

const obtenerProductos = async(req, res) => { }

const crearProductos = async(req, res) => { }

const actualizarProductos = async(req, res) => { }

const elimnarProductos = async(req, res) => { }

//Todos los metodos deben ser Exportados (se utilizaran desde la app)
//el que lo utilizara sera "routes"

module.exports = {
  listarProductos,
  obtenerProductos,
  crearProductos,
  actualizarProductos,
  elimnarProductos
}