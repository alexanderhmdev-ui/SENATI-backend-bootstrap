const { pool } = require("../config/database")
const CAMPOS = "id, apellidos, nombres, telefono, direccion, email"

const validarCampos = ({ apellidos = '', nombres = '', telefono = '', direccion = '', email = '' } = {}) => {
  const errores = []
  if (String(apellidos).trim() === '') errores.push('Apellidos es obligatorio')
  if (String(nombres).trim() === '') errores.push('Nombres es obligatorio')
  if (String(telefono).trim() === '') errores.push('El telefono es necesario')
  if (String(direccion).trim() === '') errores.push('La direccion es necesaria')
  if (String(email).trim() === '') errores.push('El email es obligatorio')
  return errores
}

const listar = async (req, res) => {
  try {
    const [clientes] = await pool.query('SELECT * FROM clientes ORDER BY id')
    res.status(200).json({
      ok: true,
      total: clientes.length,
      data: clientes,
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    })
  }
}

const obtener = async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        ok: false,
        message: 'El id no puede ser negativo o 0'
      })
    }

    const [registro] = await pool.execute('SELECT * FROM clientes WHERE id = ?', [id])

    if (registro.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'No existe el cliente'
      })
    }

    res.status(200).json({
      ok: true,
      data: registro[0]
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    })
  }
}

const crear = async (req, res) => {
  try {
    const errores = validarCampos(req.body)
    if (errores.length > 0) {
      return res.status(400).json({
        ok: false,
        message: 'Verifique los datos solicitados',
        errores
      })
    }

    const { apellidos, nombres, telefono, direccion, email } = req.body
    const consulta = 'INSERT INTO clientes (apellidos, nombres, telefono, direccion, email) VALUES (?,?,?,?,?)'
    const [registro] = await pool.execute(consulta, [apellidos, nombres, telefono, direccion, email])

    res.status(201).json({
      ok: true,
      id: registro.insertId
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    })
  }
}

const actualizar = async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        ok: false,
        message: 'El id no puede ser negativo o 0'
      })
    }

    const errores = validarCampos(req.body)
    if (errores.length > 0) {
      return res.status(400).json({
        ok: false,
        message: 'Verifique los datos solicitados',
        errores
      })
    }

    const [existe] = await pool.execute('SELECT id FROM clientes WHERE id = ?', [id])
    if (existe.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'No existe el cliente'
      })
    }

    const consulta = 'UPDATE clientes SET apellidos=?, nombres=?, telefono=?, direccion=?, email=? WHERE id=?'
    const { apellidos, nombres, telefono, direccion, email } = req.body
    const [resultado] = await pool.execute(consulta, [apellidos, nombres, telefono, direccion, email, id])

    res.status(200).json({
      ok: true,
      filasAfectadas: resultado.affectedRows
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    })
  }
}

const eliminar = async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        ok: false,
        message: 'El id no puede ser negativo o 0'
      })
    }

    const [resultado] = await pool.execute('DELETE FROM clientes WHERE id = ?', [id])

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: 'El id no existe'
      })
    }

    res.status(200).json({
      ok: true,
      message: 'Cliente eliminado'
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    })
  }
}

module.exports = {
  listar,
  obtener,
  crear,
  actualizar,
  eliminar,
}
