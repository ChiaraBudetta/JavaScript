// Estado del carrito
let carrito = [];

// Función para renderizar los productos en el DOM
function renderizarProductos(productos) {
  const productosContainer = document.getElementById('productos');
  productosContainer.innerHTML = '';

  productos.forEach(producto => {
    const card = document.createElement('div');
    card.innerHTML = `
      <p>${producto.title} - $${producto.price.toFixed(2)}</p>
      <button class="btnAgregar" data-id="${producto.id}">Agregar al Carrito</button>
    `;
    productosContainer.appendChild(card);

    // Agregar evento al botón de agregar al carrito
    card.querySelector('.btnAgregar').addEventListener('click', () => {
      agregarAlCarrito(producto);
    });
  });
}

// Función para cargar productos desde la API de Mercado Libre y devolver una promesa
function cargarProductosDesdeAPI() {
  return new Promise((resolve, reject) => {
    fetch('https://api.mercadolibre.com/sites/MLA/search?q=ropa')
      .then(response => response.json())
      .then(data => {
        const productos = data.results.slice(0, 5); // Tomamos solo los primeros 5 productos para simplificar
        renderizarProductos(productos);
        resolve(); // Resuelve la promesa
      })
      .catch(error => {
        console.error('Error al cargar productos desde la API de Mercado Libre:', error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  const productoEnCarrito = carrito.find(item => item.id === producto.id);

  if (productoEnCarrito) {
    // Si el producto ya está en el carrito, incrementa la cantidad
    productoEnCarrito.cantidad++;
  } else {
    // Si el producto no está en el carrito, agrégalo con cantidad 1
    carrito.push({ ...producto, cantidad: 1 });
  }

  Swal.fire({
    icon: 'success',
    title: 'Producto agregado al carrito',
  });

  actualizarVistaCarrito();
}

// Función para actualizar la vista del carrito en el DOM
function actualizarVistaCarrito() {
  const listaCarrito = document.getElementById('listaCarrito');
  const totalCarrito = document.getElementById('totalCarrito');

  listaCarrito.innerHTML = '';
  let total = 0;

  carrito.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `${item.title} x${item.cantidad} - $${(item.price * item.cantidad).toFixed(2)}`;
    listaCarrito.appendChild(li);

    total += item.price * item.cantidad;
  });

  totalCarrito.textContent = total.toFixed(2);
}

// Evento al hacer clic en el botón de comprar
document.getElementById('btnComprar').addEventListener('click', () => {
  Swal.fire({
    icon: 'success',
    title: 'Compra realizada con éxito',
    text: `Total: $${carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0).toFixed(2)}`,
  });

  // Limpiar el carrito después de la compra
  carrito = [];
  actualizarVistaCarrito();
});

// Cargar productos y renderizar la página al cargar
document.addEventListener('DOMContentLoaded', () => {
  cargarProductosDesdeAPI()
    .catch(error => console.error('Error al cargar productos:', error));
});