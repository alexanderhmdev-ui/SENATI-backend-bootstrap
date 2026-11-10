const mysql = require('mysql2/promise')//Accediendo modulo de conexion
const {db}= require('./env.js') //Leer y validar los parametros de conexion

//Este archivo gestiona la conexion al SERVER y la DB
const pool = mysql.createPool({
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password,
  database: db.database,
  waitForConnections: true,
  connectionLimit: db.connectionLimit,
  queueLimit: 0
})

//Verificar la conexion
const probarConexion = async() => {
  const conexion = await pool.getConnection()
  await conexion.ping() //test
  conexion.release() //Desconexion
}

//Exportar la conexion
module.exports = {pool, probarConexion} 