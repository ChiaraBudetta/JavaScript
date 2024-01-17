let cantidadProductos = 0;
let productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];

function incrementarContador() {
  cantidadProductos++;
}

function agregarAlCarrito() {
  const nombreProductoInput = document.getElementById('nombreProducto');
  const mensajeDiv = document.getElementById('mensaje');

  let nombreProducto = nombreProductoInput.value;

  if (nombreProducto.trim() !== '' && !productosEnCarrito.includes(nombreProducto)) {
    incrementarContador();
    productosEnCarrito.push(nombreProducto);
    guardarEnLocalStorage();
    mostrarMensaje(`"${nombreProducto}" se ha agregado al carrito.`);
  } else {
    mostrarMensaje('Por favor, ingrese un nombre de producto.');
  }

  nombreProductoInput.value = ''; // Limpiar el campo de entrada después de agregar al carrito
}

function mostrarMensaje(mensaje) {
  const mensajeDiv = document.getElementById('mensaje');
  mensajeDiv.innerText = mensaje;
}

function mostrarCarrito() {
  mostrarMensaje(`Productos en el carrito:\n${productosEnCarrito.join('\n')}\n\nCantidad total de productos: ${cantidadProductos}\n\nGracias por usar el carrito de compras. Hasta luego.`);
}

function guardarEnLocalStorage() {
  localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
}


document.getElementById('agregarCarritoBtn').addEventListener('click', agregarAlCarrito);
document.getElementById('mostrarCarritoBtn').addEventListener('click', mostrarCarrito);