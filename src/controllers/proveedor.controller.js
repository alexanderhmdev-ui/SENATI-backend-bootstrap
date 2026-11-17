const { pool } = require("../config/database")
const CAMPOS = "id, razonsocial, contacto, ruc, direccion"

const validarCampos = ({ razonsocial = '', contacto = '', ruc = '', direccion = '' } = {}) => {
  const errores = []
  if (String(razonsocial).trim() === '') errores.push('Razon social es obligatoria')
  if (String(contacto).trim() === '') errores.push('El contacto es necesario')
  if (String(ruc).trim() === '') errores.push('El RUC es obligatorio')
  if (String(direccion).trim() === '') errores.push('La direccion es necesaria')
  return errores
}

const listar = async (req, res) => {
  try {
    const [proveedores] = await pool.query('SELECT * FROM proveedores ORDER BY id')
    res.status(200).json({
      ok: true,
      total: proveedores.length,
      data: proveedores,
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

    const [registro] = await pool.execute('SELECT * FROM proveedores WHERE id = ?', [id])

    if (registro.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'No existe el proveedor'
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

    const { razonsocial, contacto, ruc, direccion } = req.body
    const consulta = 'INSERT INTO proveedores (razonsocial, contacto, ruc, direccion) VALUES (?,?,?,?)'
    const [registro] = await pool.execute(consulta, [razonsocial, contacto, ruc, direccion])

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

    const [existe] = await pool.execute('SELECT id FROM proveedores WHERE id = ?', [id])
    if (existe.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'No existe el proveedor'
      })
    }

    const consulta = 'UPDATE proveedores SET razonsocial=?, contacto=?, ruc=?, direccion=? WHERE id=?'
    const { razonsocial, contacto, ruc, direccion } = req.body
    const [resultado] = await pool.execute(consulta, [razonsocial, contacto, ruc, direccion, id])

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

    const [resultado] = await pool.execute('DELETE FROM proveedores WHERE id = ?', [id])

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: 'El id no existe'
      })
    }

    res.status(200).json({
      ok: true,
      message: 'Proveedor eliminado'
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
