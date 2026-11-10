//app = aplication
const express = require('express')
const routes = require('./routes')

const app = express()

app.use(express.json())

appp.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'API REST ejecutandose correctamente'
  
  })
})

app.use('/api', routes)
module.exports = app