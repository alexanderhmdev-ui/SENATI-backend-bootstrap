//Este archivo contiene la logica de la aplicación
//5 procedimientos: buscar, listar, registrar, actualizar, eliminar

//Paso 1
//const objeto= requiere() //Todas las funciones
//const { otroObjeto } = require('') // Solo algunas funciones
const { pool } = require("../config/database");
const CAMPOS = "id, marca, descripcion, precio, stock"; //dato comun

//Todas las funciones seran asincronas (tardaran un tiempo en ser resueltas...)
//milisegundos, segundos (1000 = 1seg)
//Todas las funciones reciben y envian datos (pasarelas)
const listarProductos = async (req, res) => {
  //Se utilizar try - catch por que existe una probabilidad de error
  try {
    const [productos] = await pool.query("SELECT * FROM productos ORDER BY id");
    res.status(200).json({
      ok: true,
      total: productos.length,
      data: productos,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

const obtenerProductos = async (req, res) => {
  try {
    const [productos] = await pool.query("SELECT * FROM productos ORDER BY id");
    res.status(200).json({
      ok: true,
      total: productos.length,
      data: productos,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

const crearProductos = async (req, res) => {
  try {
    const [productos] = await pool.query("SELECT * FROM productos ORDER BY id");
    res.status(200).json({
      ok: true,
      total: productos.length,
      data: productos,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

const actualizarProductos = async (req, res) => {
  try {
    const [productos] = await pool.query("SELECT * FROM productos ORDER BY id");
    res.status(200).json({
      ok: true,
      total: productos.length,
      data: productos,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

const elimnarProductos = async (req, res) => {
  try {
    const [productos] = await pool.query("SELECT * FROM productos ORDER BY id");
    res.status(200).json({
      ok: true,
      total: productos.length,
      data: productos,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

//Todos los metodos deben ser Exportados (se utilizaran desde la app)
//el que lo utilizara sera "routes"

module.exports = {
  listarProductos,
  obtenerProductos,
  crearProductos,
  actualizarProductos,
  elimnarProductos,
};
