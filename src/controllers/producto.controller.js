
//Este archivo contiene la logica de la aplicación
//5 procedimientos: buscar, listar, registrar, actualizar, eliminar

const { pool } = require("../config/database")
const CAMPOS = "id, marca, descripcion, precio, stock" //dato comun

const validarCampos = ({marca = '', descripcion = '', precio, stock} = {}) => {
  const errores = []
  if (String(marca).trim() === '') errores.push('Marca es obligatoria')
  if (String(descripcion).trim() === '') errores.push('La descripcion es necesaria')
  if (precio === undefined || isNaN(precio) || Number(precio) < 0) errores.push('Verifique el precio')
  if (stock === undefined || isNaN(stock) || !Number.isInteger(Number(stock)) || Number(stock) < 0) errores.push('Error en el stock')
  return errores
}

const listarProductos = async (req, res) => {
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

const obtenerProductos = async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id) || id <= 0 ){
      return res.status(400).json({
        ok: false,
        message: 'EL id no puede ser negativo o 0'
      })
    }

    const [registro] = await pool.execute(`SELECT * FROM productos WHERE id = ?`,[id])

    if(registro.length === 0){
      return res.status(404).json({
        ok: false,
        message: 'No existe el producto'
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
    const errores = validarCampos(req.body)
    if (errores.length > 0){
      return res.status(400).json({
        ok: false,
        message: 'Verifique los datos solicitados',
        errores 
      })
    }

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
    const id = Number(req.params.id)

    if (isNaN(id) || id <= 0){
      return res.status(400).json({
        ok: false ,
        message: 'El id no puede ser negativo o 0'
      })
    }

    const errores = validarCampos(req.body)                                 
    if (errores.length > 0){
      return res.status(400).json({
        ok: false,
        message: 'Verifique los datos solicitados', 
        errores
      })
    }
    const [existe] = await pool.execute('SELECT id FROM productos WHERE id = ?', [id])
    if (existe.length === 0){
      return res.status(404).json({
        ok: false,
        message: 'No existe el producto'
      })
    }
    const consulta = 'UPDATE productos SET marca=?, descripcion=?, precio=?, stock=? WHERE id=?'
    const { marca, descripcion, precio, stock} = req.body
    const [resultado] = await pool.execute(consulta, [marca, descripcion, precio, stock, id])
    
    res.status(200).json({
      ok: true,
      filasAfectadas: resultado.affectedRows
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
    const id = Number(req.params.id)
    if (isNaN(id) || id <= 0){
      return res.status(400).json({
        ok: false,
        message: 'El id no puede ser negativo o 0'
      })
    }

    const [resultado] = await pool.execute('DELETE FROM productos WHERE id = ?', [id])

    if (resultado.affectedRows === 0 ){
      return res.status(404).json({
        ok: false, 
        message: 'EL id no existe'
      })
    }

    res.status(200).json({
      ok: true,
      message: 'Producto eliminado'
    })
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    })
  }
}

module.exports = {
  listarProductos,
  obtenerProductos,
  crearProductos,
  actualizarProductos,
  elimnarProductos,
}
