const API = "/api/productos";

//Gestion del DOM
const formProducto = document.getElementById("formProducto");
const formBuscar = document.getElementById("formBuscar");
const cuerpoTabla = document.getElementById("cuerpoTabla");
const campoID = document.getElementById("id");

//Cajas del formulario de registro
const marca = document.getElementById("marca");
const descripcion = document.getElementById("descripcion");
const precio = document.getElementById("precio");
const stock = document.getElementById("stock");

//caja del formulario de busqueda
const buscarId = document.getElementById("buscarId");
const mostrarTodos = document.getElementById("mostrarTodos");

//Renderizar los datos obtenidos API REST en el cuerpo de la tabla
function dibujarTabla(productos) {
  //Si no hay productos registrados en la BD...
  if (productos.length === 0) {
    cuerpoTabla.innerHTML = `<tr><td colspan='6' class='text-center'>No hay productos</td></tr>`;
    return;
  }

  //Reiniciamos el cuerpo de la tabla
  cuerpoTabla.innerHTML = "";

  //Si encontramos productos (al menos 1)
  //el type='button' requiere control desde JS
  productos.forEach((p) => {
    cuerpoTabla.innerHTML += `
    <tr>
      <td>${p.id}</td>
      <td>${p.marca}</td>
      <td>${p.descripcion}</td>
      <td>${p.precio}</td>
      <td>${p.stock}</td>
      <td>
        <button type='button' onclick='editarProducto(${p.id})' class='btn-sm btn-solid theme-primary'>Editar</button>
        <button type='button' onclick='eliminarProducto(${p.id})' class='btn-sm btn-outline theme-danger'>Eliminar</button>
      </td>
    </tr>
    `;
  });
} //fin dibujarTabla()

//Nos conectaamo al BACKEND para buscar el ID
async function editarProducto(id) {
  try {
    const respuesta = await fetch(`${API}/${id}`);
    const resultado = await respuesta.json();

    if (!resultado.ok) {
      console.error("El id no existe");
      return;
    }

    //En caso exista

    const producto = resultado.data;

    //campor formulario - atributos del objeto
    campoID.value = producto.id;
    marca.value = producto.marca;
    descripcion.value = producto.descripcion;
    precio.value = producto.precio;
    stock.value = producto.stock;
  } catch (e) {
    console.error(e);
  }
}

// Eliminacion Fisica -> BACKEND
async function eliminarProducto(id) {
  const rpta = confirm("¿Estas seguro de eliminarla completamente?");
  if (!rpta) {
    return;
  }

  try {
    const respuesta = await fetch(`${API}/${id}`, { method: "DELETE" });
    const resultado = await respuesta.json();

    if (!resultado) {
      console.error("No se pudo eliminar");
      return;
    }

    cargarProductos();
    alert(resultado.message);
  } catch (e) {
    console.error(e);
  }
}

//¿Como accedemos a los datos? -> BACKEND
async function cargarProductos() {
  try {
    //http://localhost:3000 <-> https://miempresa.com
    //Agregamos el valor API
    const respuesta = await fetch(API);
    const resultado = await respuesta.json();
    dibujarTabla(resultado.data);
  } catch (e) {
    console.error(e);
  }
}

//Funcion para registrar un nuevo producto -> BACKEND
async function guardarProducto() {
  //Crear un objeto en JS -> enviar datos
  const producto = {
    marca: marca.value,
    descripcion: descripcion.value,
    precio: parseFloat(precio.value),
    stock: parseInt(stock.value),
  };

  try {
    //Debemos evaluar si es un registro nuevo o una actualizacion
    const editando = campoID.value !== "";

    //construimos la URL para el metodo PUT (actualizacion)
    const url = editando ? `${API}/${campoID.value}` : API;

    //puede ser POST o PUT
    const metodo = editando ? "PUT" : "POST";

    //Enviamos por el metodo POST, un JSON, convertido del objeto "producto"
    const respuesta = await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });

    const resultado = await respuesta.json();
    console.log(resultado);

    if (!resultado.ok) {
      console.error("No se pudo registrar un producto");
      return;
    }

    //Actualizamos la lista
    cargarProductos();
    formProducto.reset();
    marca.focus();
  } catch (e) {
    console.error(e);
  }
}

//funcion para buscar productos --> BACHEND
async function buscarProductos(id) {
  try {
    const respuesta = await fetch(`${API}/${id}`);
    const resultado = await respuesta.json();

    //Si no enocntramos registros
    if (!respuesta.ok) {
      dibujarTabla([]);
      return;
    }

    //DATA ES UN OBJETO{} POR LO QAUE LO ENVIAMOS COMO ARREGLO [{}]
    dibujarTabla([resultado.data]);
  } catch (e) {
    console.error(e);
  }
}

formBuscar.addEventListener("submit", function (e) {
  e.preventDefault();
  buscarProductos(buscarId.value);
});

//Controlar el evento SUBMIT (envio) del formulario
formProducto.addEventListener("submit", function (e) {
  e.preventDefault(); //Stop

  const rpta = confirm("Estas seguro de registrar el producto?");
  if (!rpta) {
    return;
  }
  guardarProducto(); //Esta funcion gestiona el proceso
});

mostrarTodos.addEventListener("click", function () {
  formBuscar.reset();
  cargarProductos();
});

cargarProductos();
