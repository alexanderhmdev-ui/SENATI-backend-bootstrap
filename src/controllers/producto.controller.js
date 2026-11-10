//Este archivo contiene la logica de la aplicación
//5 procedimientos: buscar, listar, registrar, actualizar, eliminar

//Paso 1
//const objeto= requiere() //Todas las funciones
//const { otroObjeto } = require('') // Solo algunas funciones
const { pool } = require("../config/database")
const CAMPOS = "id, marca, descripcion, precio, stock" //dato comun

//Todas las funciones seran asincronas (tardaran un tiempo en ser resueltas...)
//milisegundos, segundos (1000 = 1seg)
//Todas las funciones reciben y envian datos (pasarelas)
const validarCampos = ({marca, descripcion, precio, stock} = {}) => {
  const errores = []
  if (marca.trim() === '') errores.push('Marca es obligatoria')
  if (descripcion.trim() === '') errores.push('La descripcion es necesaria')
  if (precio === undefined || isNaN(precio) || precio < 0) errores.push('Verifique el precio')
  if (stock === undefined || Number.isInteger(stock) || Number(stock) < 0) errores.push('Error en el stock')
//Es posible tener más de un error
    return errores
}

const listarProductos = async (req, res) => {
  //Se utilizar try - catch por que existe una probabilidad de error
  try {
    const [productos] = await pool.query('SELECT * FROM productos ORDER BY id');
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
//buscar ¿Como funciona?
//API REST => http://miaplicacion.com/api/productos/1
const obtenerProductos = async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (id <= 0 ){
      return res.status(400).json({
        ok: false,
        message: 'EL id no puede ser negativo o 0'
      })
    }

    //SI podemos buscar (>0)
    //Utilizaremos 'execute' porque pasaremos parametros
    const [registro] = await pool.execute(`SELECT * FROM productos WHERE id = ?`,[id])

    if(registro.length === 0){
      return res.status(404).json({
      ok: false,
      message: 'No existe el produto'
      })
    }

    res.status(200).json({
      ok: true,
      data: registro[0]
    })
  }catch(e){
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

const crearProductos = async (req, res) => {
  try {
    const errores = validarCampos(req.body) //req.body tiene todos los datos a registras 
    if (errores.lenght > 0){
      return res.status(400).json({
        ok: false,
        message: 'Verifique los datos solicitados',
        errores 
      })
    }

    //procedemos a guardar los datos
    const {marca, descripcion, precio, stock} = req.body 
    const consulta = `INSERT INTO productos (marca, descripcion, precio, stock) VALUES (?,?,?,?)`
    const [registro] = await pool.execute(consulta, [marca, descripcion, precio, stock])

    res.status(201).json({
      ok: true,
      id: registro.insertId
    })
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    })
  }
}

const actualizarProductos = async (req, res) => {
  try {
    //Obtener el id del producto actualizado 
    const id = Number(req.params.id)

    if (id < 0){
      return res.status(400).json({
        ok: false ,
        message: 'El id no puede ser negativo'
      })
    }

    const errores = validarCampos(req.body)                                 
    if (errores.lenght > 0){
      return res.status(400).json({
        ok: false,
        message: 'Verifique los datos solicitados', 
        errores
      })
    }
    const [existe] = await pool.execute('SELECT id FROM productos WHERE id = ?', [id])
    if (existe === 0){
      return res.status(404).json({

      })
    }
    const consulta = 'UPDATE productos SET marca=?, descripcion=?, precio=?, stock=? WHERE id=?'
    const { marca, descripcion, precio, stock} = req.body
    const [resultado] = await pool.execute(consulta, [marca, descripcion, precio, stock, id])
    
    res.status(204).json({
      ok: true,
      filasAfectdas: resultado.affectedRows
    })
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    })
  }
}

const elimnarProductos = async (req, res) => {
  try {
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    })
  }
}

//Todos los metodos deben ser Exportados (se utilizaran desde la app)
//el que lo utilizara sera "routes"

module.exports = {
  listarProductos,
  obtenerProductos,
  crearProductos,
  actualizarProductos,
  elimnarProductos,
}
