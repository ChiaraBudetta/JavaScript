let cantidadProductos = 0;
let productosEnCarrito = [];
const esEsc = productosEnCarrito.find(producto => producto.toLowerCase() === 'esc');

function incrementarContador() {
  cantidadProductos++;
}


function agregarAlCarrito() {
  do {
    let nombreProducto = prompt('Ingrese el nombre del producto para agregar al carrito (escriba "esc" para salir):');
    
    if (esEsc) {
      alert(`Productos en el carrito:\n${productosEnCarrito.join('\n')}\n\nCantidad total de productos: ${cantidadProductos}\n\nGracias por usar el carrito de compras. Hasta luego.`);
      return;
    }
    if (nombreProducto !== null && nombreProducto.trim() !== '' && !productosEnCarrito.includes(nombreProducto))  {
      incrementarContador();
        productosEnCarrito.push(nombreProducto);
        alert(`"${nombreProducto}" se ha agregado al carrito.`);
    } else if (nombreProducto && nombreProducto.toLowerCase() === 'esc') {
      alert(`Productos en el carrito:\n${productosEnCarrito}\n\nCantidad total de productos: ${cantidadProductos}\n\nGracias por usar el carrito de compras. Hasta luego.`);
      return;
    }else {
      alert('Por favor, ingrese un nombre de producto.');
    }
  } while (true); 
}


agregarAlCarrito();
