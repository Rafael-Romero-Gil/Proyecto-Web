let productos = [];

// Obtener los productos desde el servidor
const basededatos = fetch('db/get_productos.php')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Datos recibidos:', data); // Verificar los datos recibidos
    productos = data; // Asignar los datos a `productos`
    loadProductos(productos);
    loadFiltros();
    if (localStorage.cesta) {
      viewCarrito();
    }
  })
  .catch(error => {
    console.error('Hubo un problema con el fetch: ', error);
  });

const botonCarrito = document.getElementById("bCarrito");
const capaCarrito = document.getElementById("listaCompra");
const alertaC = document.getElementById("alertaC");

let listaIds = [];
let listaCarrito = [];
let cesta = [];
let Ids = [];
let filtroActivoBusqueda = false;
let filtrosActivos = [];
let filtroTipo = [];
let filtroBusqueda = [];

document.addEventListener("DOMContentLoaded", () => {
  basededatos.then(() => {
    if (productos.length > 0) {
      loadProductos(productos);
      loadFiltros();
      if (localStorage.cesta) {
        viewCarrito();
      }
    } else {
      console.error('No se pudieron cargar los productos');
    }
  });
});

botonCarrito.addEventListener("mouseenter", () => { 
  viewCarrito(); // Asegurarse de actualizar la vista del carrito cuando el ratón pasa por encima
  capaCarrito.style.display = "inline-block"; 
});
botonCarrito.addEventListener("mouseleave", () => { 
  capaCarrito.style.display = "none"; 
});
document.getElementById("buscar").addEventListener("input", busqueda);

window.addProductCart = async function addProductCart(idProducto) {
    const cantidadElement = document.getElementById(`id${idProducto}`);
    if (!cantidadElement) {
        console.error(`Elemento con id id${idProducto} no encontrado`);
        return;
    }

    const cantidad = parseInt(cantidadElement.value);
    if (isNaN(cantidad) || cantidad <= 0) {
        console.error(`Cantidad inválida: ${cantidad}`);
        return;
    }

    let product = productos.find(p => p.id.toString() === idProducto.toString());
    if (!product) {
        console.error(`Producto con id ${idProducto} no encontrado en productos`);
        return;
    }

    for (let y = 0; y < cantidad; y++) {
        listaIds.push(idProducto);
    }

    if (!listaCarrito.some(p => p.id.toString() === idProducto.toString())) {
        listaCarrito.push(product);
    }

    console.log('Añadido al carrito:', product);
    console.log('Lista de carrito:', listaCarrito);
    console.log('Lista de IDs:', listaIds);

    alertCompra(product);
    loadProductCart(listaCarrito);
    viewCarrito();

    // Resetear el valor del input a 0
    cantidadElement.value = 0;
};

async function loadProductos(products) {
    let html = products.map(product => `
        <div class="product-container">
            <div class="card product">
                <img src="${product.image}" class="card-img" alt="${product.name}" />
            </div>
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <h6 class="card-text">${product.info}</h6>
                <h6 class="card-text">${product.precio} € / Kilo</h6>
                <input type="number" id="id${product.id}" class="card-number form-control form-control-sm text-center d-inline-block" value="0" min="0" max="25">
                <button type="button" class="btn btn-primary m-3" onClick="addProductCart(${product.id})">Añadir al carrito</button>
            </div>
        </div>
    `).join('');
    document.getElementsByClassName("products")[0].innerHTML = html;
}

async function viewCarrito() {
    if (localStorage.cesta) {
        cesta = JSON.parse(localStorage.getItem("cesta"));
        Ids = JSON.parse(localStorage.getItem("cestaIds"));

        console.log('Cesta cargada desde localStorage:', cesta);
        console.log('IDs cargados desde localStorage:', Ids);
    } else {
        cesta = [];
        Ids = [];
    }

    // Crear un mapa para contar las ocurrencias de cada ID
    let cantidadPorId = {};
    Ids.forEach(id => {
        cantidadPorId[id] = (cantidadPorId[id] || 0) + 1;
    });

    // Construir el HTML
    let html = cesta.map(element => {
        let cantidad = cantidadPorId[element.id] || 0;
        return `
        <div class="product-viewCesta">
            <div class="viewCesta">        
                <p><b>${element.name}:  </b><span class="cantidad">Qty: ${cantidad}Kg</span></p>           
            </div>
        </div>
        `;
    }).join('');
    document.getElementsByClassName("listaCompra")[0].innerHTML = html;
}

async function alertCompra(compra) {
    let cantidad = listaIds.filter(id => id.toString() === compra.id.toString()).length;
    let precioTotal = compra.precio * cantidad;
    let html = `
    <div>
        <span>El siguiente articulo se ha añadido a la cesta</span>
    </div>
    <div class="product-cart">
        <img src="${compra.image}" class="cart-img" alt="${compra.name}" />
        <div class="content-cart">        
            <p><b>${compra.name}</b></p>
            <span class="cantidad">Qty: ${cantidad}Kg</span>
            <p>Total: ${precioTotal.toFixed(2)}€</p>
        </div>
    </div>
    `;
    document.getElementsByClassName("alertCompra")[0].innerHTML = html;
    alertaC.style.display = "flex";
    setTimeout(() => { alertaC.style.display = "none"; }, 2000);
}

async function loadProductCart(lista) {
    console.log('Guardando en localStorage: cesta', lista);
    console.log('Guardando en localStorage: cestaIds', listaIds);

    localStorage.setItem('cesta', JSON.stringify(lista));
    localStorage.setItem('cestaIds', JSON.stringify(listaIds));
}

async function loadFiltros() {
    let tipos = [...new Set(productos.map(p => p.tipo))];
    let temporadas = [...new Set(productos.map(p => p.temporada))];
    let familias = [...new Set(productos.map(p => p.familia))];

    let htmlTipo = tipos.map(tipo => `<input type="checkbox" name="${tipo}" onchange="filtro(this)" id="f${tipo}">${tipo}<br>`).join('');
    let htmlTemporada = temporadas.map(temporada => `<input type="checkbox" name="${temporada}" onchange="filtro(this)" id="f${temporada}">${temporada}<br>`).join('');
    let htmlFamilia = familias.map(familia => `<input type="checkbox" name="${familia}" onchange="filtro(this)" id="f${familia}">${familia}<br>`).join('');

    document.getElementsByClassName("filter-container")[0].innerHTML = `
    <div class="filter">
        <button class="bdesple"><a href="#demo1" class="tipos" data-bs-toggle="collapse">Tipo &#8595;</a></button>
        <div id="demo1" class="collapse show">${htmlTipo}</div>
    </div>
    <div class="filter">
        <button class="bdesple"><a href="#demo2" class="tipos" data-bs-toggle="collapse">Temporada &#8595;</a></button>
        <div id="demo2" class="collapse">${htmlTemporada}</div>
    </div>
    <div class="filter">
        <button class="bdesple"><a href="#demo3" class="tipos" data-bs-toggle="collapse">Familia &#8595;</a></button>
        <div id="demo3" class="collapse">${htmlFamilia}</div>
    </div> 
    `;
}

function busqueda() {
    const search = document.getElementById("buscar").value.toLowerCase();
    if (filtrosActivos.length > 0) {
        filtroActivoBusqueda = true;
        filtroBusqueda = filtroTipo.filter(product => product.name.toLowerCase().includes(search));
        loadProductos(filtroBusqueda);
    } else {
        filtroActivoBusqueda = search !== "";
        filtroBusqueda = productos.filter(product => product.name.toLowerCase().includes(search));
        loadProductos(filtroBusqueda);
    }
}

function filtro(checkbox) {
    if (checkbox.checked) {
        filtrosActivos.push(checkbox.name);
    } else {
        filtrosActivos = filtrosActivos.filter(filtro => filtro !== checkbox.name);
    }

    let productsToFilter = filtroActivoBusqueda ? filtroBusqueda : productos;
    filtroTipo = productsToFilter.filter(product => 
        filtrosActivos.includes(product.tipo) || 
        filtrosActivos.includes(product.temporada) || 
        filtrosActivos.includes(product.familia)
    );

    loadProductos(filtroTipo.length ? filtroTipo : productsToFilter);
}

const dateActual = Date.now();
if (localStorage.getItem("date") < (dateActual - 2000000)) {
    localStorage.removeItem("cesta");
    localStorage.removeItem("cestaIds");
    localStorage.setItem("date", Date.now());
}
