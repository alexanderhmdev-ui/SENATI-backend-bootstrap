//app = aplication
const path = require("path");
const express = require("express"); //Framework para crear aplicaciones web y APIs
const routes = require("./routes"); //Rutas de la API

const app = express(); //Inicializamos la app
app.use(express.json()); //Comunicacion es Json

//Mensaje predeterminado 
//http://miaplicacion.com/
/*
app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "API REST ejecutandose correctamente",
  });
});
*/
app.use(express.static(path.join(__dirname, '..', 'public'))); //Carpeta publica para el front-end

//Habilitamos las rutas de la API
app.use("/api", routes);
module.exports = app;
