let cantidadProductos = 0;
let productosEnCarrito = '';


function incrementarContador() {
  cantidadProductos++;
}


function agregarAlCarrito() {
  do {
    let nombreProducto = prompt('Ingrese el nombre del producto para agregar al carrito (escriba "esc" para salir):');
    if (nombreProducto !== null && nombreProducto.trim() !== '' && nombreProducto !== 'esc') {
      incrementarContador();
      productosEnCarrito += `"${nombreProducto}"\n`;
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
