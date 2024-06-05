const baseDeDatos = [
    {
        id:1,
        name: "Manzana Golden",
        image: "../../imagenes/manzana golden.jpg",
        info: "Manzana tono amarillo procedente de x",
        precio: 1.20,
        familia: "Fruta",
        temporada: "Invierno",
        tipo: "Manzana"
    },
    {
        id:2,
        name: "Manzana Smith",
        image: "../../imagenes/manzana smith.png",
        info: "Manzana tono amarillo procedente de x",
        precio: 1.40,
        familia: "Fruta",
        temporada: "Invierno",
        tipo: "Manzana"
    },
    {
        id:3,
        name: "Manzana fuji",
        image: "../../imagenes/manzana fuji.png",
        info: "Manzana tono amarillo procedente de x",
        precio: 2,
        familia: "Fruta",
        temporada: "Verano",
        tipo: "Manzana"
    },
    {
        id:4,
        name: "Pera conference",
        image: "../../imagenes/manzana golden.png",
        info: "Manzana tono amarillo procedente de x",
        precio: 1.20,
        familia: "Fruta",
        temporada: "Primavera",
        tipo: "Pera"
    },
    {
        id:5,
        name: "Pera d'anjou",
        image: "../../imagenes/manzana smith.png",
        info: "Manzana tono amarillo procedente de x",
        precio: 1.40,
        familia: "Fruta",
        temporada: "Invierno",
        tipo: "Pera"
    },
    {
        id:6,
        name: "Pera bartlett",
        image: "../../imagenes/manzana fuji.png",
        info: "Manzana tono amarillo procedente de x",
        precio: 2,
        familia: "Fruta",
        temporada: "Invierno",
        tipo: "Pera"
    }
];

var botonCarrito = document.getElementById("bCarrito");
var capaCarrito = document.getElementById("listaCompra");
var alertaC = document.getElementById("alertaC");


async function loadProductos(products) {
    let html = "";
    products.forEach(product => {
        html += `
        <div class="product-container">
            <div class="card product">
                <img
                    src="${product.image}"
                    class="card-img"
                    alt="${product.name}"
                />
            </div>
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <h6 class="card-text">${product.info}</h6>
                <h6 class="card-text">${product.precio} € / Kilo</h6>
                <input type="number" id="id${product.id}" class="card-number form-control form-control-sm text-center d-inline-block" value="0" min="0" max="25">
                <button type="button" class="btn btn-primary m-3" onClick=(addProductCart(${product.id}))>Añadir al carrito</button>
            </div>
        </div>
        `;
    });
    document.getElementsByClassName("products")[0].innerHTML = html;
};

let listaIds = [0];
var listaCarrito = [];

async function addProductCart(idProducto) {
    const cantidad = document.getElementById(`id${idProducto}`).value;
    if (cantidad != 0) {
        for (let y = 0; y < cantidad; y++) {
            listaIds.push(idProducto);
        }
        if (listaCarrito.length < 1) {
            productos.forEach(product => {
                if (product.id === idProducto) {
                    listaCarrito.push(product);
                    alertCompra(product);
                    viewCarrito();
                };
            });
            loadProductCart(listaCarrito);
        } else {
            let exist = false;

            listaCarrito.forEach(element => {
                if (element.id === idProducto) {
                    exist = true;
                }
            });
            if (exist === false) {
                productos.forEach(product => {
                    if (product.id === idProducto) {
                        listaCarrito.push(product);
                        alertCompra(product);
                        viewCarrito();
                    };
                });
                loadProductCart(listaCarrito);
            } else {
                for (let y = 0; y < productos.length; y++) {
                    if (productos[y].id === idProducto) {
                        alertCompra(productos[y]);
                        viewCarrito();
                        break;
                    }
                }
                loadProductCart(listaCarrito);
            }
        }
    }
};
var cesta = [];
async function viewCarrito() {
    var html = "";
    if(localStorage.cesta){
        cesta = JSON.parse(localStorage.getItem("cesta"));
        Ids = JSON.parse(localStorage.getItem("cestaIds"));
    }

    let view = cesta.concat(listaCarrito);
    var hash = {};
        view = view.filter(function(current) {
            var exists = !hash[current.id];
            hash[current.id] = true;
            return exists;
        });
    let viewIds = [...listaIds, ...Ids];
   
    view.forEach(element => {
        let cantidad = 0;
        viewIds.forEach(id => {
            if (id === element.id) {
                cantidad++;
            }
        });
        html += `
    <div class="product-viewCesta">
        <div class="viewCesta">        
            <p><b>${element.name}:  </b><span class="cantidad">Qty: ${cantidad}Kg</span></p>           
        </div>
    </div>
    `;
    });
    document.getElementsByClassName("listaCompra")[0].innerHTML = html;
};

let Ids=[];
async function alertCompra(compra) {
    let html = "";


    if(localStorage.cestaIds){
        Ids = JSON.parse(localStorage.getItem("cestaIds"));
    }
    let viewIds = [...listaIds, ...Ids];

    if (compra != null) {
        let cantidad = 0;
        if(localStorage.cestaIds){
            viewIds.forEach(id => {
                if (id === compra.id) {
                    cantidad++;
                }
            });         
        }else{
            listaIds.forEach(id => {
                if (id === compra.id) {
                    cantidad++;
                }
            });
        }
        
        let precioTotal = compra.precio * cantidad;

        html = `
        <div>
        <span>El siguiente articulo se ha añadido a la cesta</span>
        </div>
        <div class="product-cart">
            <img src="${compra.image}" class="cart-img" alt="${compra.name}"/>
            <div class="content-cart">        
                <p><b>${compra.name}</b></p>
                <span class="cantidad">Qty: ${cantidad}Kg</span>
                <p>Total: ${precioTotal.toFixed(2)}€</p>
            </div>
        </div>
        `;
    };
    document.getElementsByClassName("alertCompra") [0].innerHTML = html;
    alertaC.style.display="flex";
    setTimeout(temporizador,2000);

};

function temporizador(){
    alertaC.style.display="none";
}



async function loadProductCart(lista){
    localStorage.setItem('lista', JSON.stringify(lista));
    localStorage.setItem('listaIds', JSON.stringify(listaIds));
    
};



async function loadFiltros() {
    let htmlTipo = "";
    let tipoRepetidos =[];
    productos.forEach(product => {
        if(!tipoRepetidos.includes(product.tipo)){
            htmlTipo += `
        <input type="checkbox" name="${product.tipo}" onchange="filtro(this)" id="f${product.tipo}">${product.tipo}<br>
        `;
        tipoRepetidos.push(product.tipo);
        }; 
    });
    let htmlTemporada = "";
    let temporadaRepetidos = [];
    productos.forEach(product => {
        if(!temporadaRepetidos.includes(product.temporada)){
            htmlTemporada += `
        <input type="checkbox" name="${product.temporada}" onchange="filtro(this)" id="f${product.temporada}">${product.temporada}<br>
        `;
        temporadaRepetidos.push(product.temporada);
        }; 
    });
    let htmlFamilia = "";
    let familiaRepetidos = [];
    productos.forEach(product => {
        if(!familiaRepetidos.includes(product.familia)){
            htmlFamilia += `
        <input type="checkbox" name="${product.familia}" onchange="filtro(this)" id="f${product.familia}">${product.familia}<br>
        `;
        familiaRepetidos.push(product.familia);
        }; 
    });
    let htmlFinal = `
    <div class="filter">
        <button class="bdesple"><a href="#demo1" class="tipos" data-bs-toggle="collapse">Tipo &#8595;</a></button>
        <div id="demo1" class="collapse show">
        ${htmlTipo}
        </div>
    </div>
    <div class="filter">
        <button class="bdesple"><a href="#demo2" class="tipos" data-bs-toggle="collapse">Temporada &#8595;</a></button>
        <div id="demo2" class="collapse">
        ${htmlTemporada}
        </div>
    </div>
    <div class="filter">
        <button class="bdesple"><a href="#demo3" class="tipos" data-bs-toggle="collapse">Familia &#8595;</a></button>
        <div id="demo3" class="collapse">
        ${htmlFamilia}
        </div>
    </div> 
    `;
    document.getElementsByClassName("filter-container") [0].innerHTML = htmlFinal;
};

const productos = baseDeDatos;
const searchInput = document.getElementById("buscar");
var filtroBusqueda = [];
function busqueda() {
    const search = searchInput.value.toLowerCase();
    if(filtrosActivos>0){
        filtroBusqueda = filtroTipo.filter((product) => product.name.toLowerCase().includes(search));
        loadProductos(filtroBusqueda);
    }else{
        filtroActivoBusqueda = true;
        filtroBusqueda = productos.filter((product) => product.name.toLowerCase().includes(search));
        loadProductos(filtroBusqueda);
    }
};


let filtroActivoBusqueda = false;
let filtrosActivos = 0;
let filtroTipo=[];
function filtro(checkbox) {
    if(filtroActivoBusqueda===true){
        if(checkbox.checked){
            if(filtrosActivos<1){
                filtrosActivos++;
                var temporal =[];
                filtroBusqueda.forEach(element => {
                    if(checkbox.name===element.tipo){
                        temporal.push(element);
                    }else if(checkbox.name===element.temporada){
                        temporal.push(element);
                    }else if(checkbox.name===element.familia){
                        temporal.push(element);
                    }
                });
                filtroTipo = temporal;
            }else{
                filtrosActivos++;
                var temporal =[];
                filtroBusqueda.forEach(element => {
                    if(checkbox.name===element.tipo){
                        temporal.push(element);
                    }else if(checkbox.name===element.temporada){
                        temporal.push(element);
                    }else if(checkbox.name===element.familia){
                        temporal.push(element);
                    }
                });
                temporal.forEach(element => {
                    filtroTipo.push(element);
                });
            };
            loadProductos(filtroTipo);
        }else if(!checkbox.checked){
            filtrosActivos--;
            if(filtrosActivos<1){
                loadProductos(filtroBusqueda);
            }else{
                var temporal =[];
                filtroTipo.forEach(element => {
                    if(checkbox.name===element.tipo){
                        temporal.push(element);
                    }else if(checkbox.name===element.temporada){
                        temporal.push(element);
                    }else if(checkbox.name===element.familia){
                        temporal.push(element);
                    }
                });
                filtroTipo = temporal;
                loadProductos(filtroTipo);
            };
        };
    }else{
        if(checkbox.checked){
            if(filtrosActivos<1){
                filtrosActivos++;
                var temporal =[];
                productos.forEach(element => {
                    if(checkbox.name===element.tipo){
                        temporal.push(element);
                    }else if(checkbox.name===element.temporada){
                        temporal.push(element);
                    }else if(checkbox.name===element.familia){
                        temporal.push(element);
                    }
                });
                filtroTipo = temporal;
            }else{
                filtrosActivos++;
                var temporal =[];
                filtroTipo.forEach(element => {
                    if(checkbox.name===element.tipo){
                        temporal.push(element);
                    }else if(checkbox.name===element.temporada){
                        temporal.push(element);
                    }else if(checkbox.name===element.familia){
                        temporal.push(element);
                    }
                });
                filtroTipo = temporal;
            };
            loadProductos(filtroTipo);
        }else if(!checkbox.checked){
            filtrosActivos--;
            if(filtrosActivos<1){
                loadProductos(productos);
            }else{
                var temporal =[];
                filtroTipo.forEach(element => {
                    if(checkbox.name===element.tipo){
                        temporal.push(element);
                    }else if(checkbox.name===element.temporada){
                        temporal.push(element);
                    }else if(checkbox.name===element.familia){
                        temporal.push(element);
                    }
                });
                filtroTipo = temporal;
                loadProductos(filtroTipo);
            };
        };
    }
    
};

document.addEventListener("DOMContentLoaded", () => {
    loadProductos(productos);
    loadFiltros();


    if(localStorage.cesta){
       viewCarrito();
    }

});

var dateActual = Date.now();
if(localStorage.getItem("date")<(dateActual-2000000)){
    localStorage.removeItem("cesta");
    localStorage.removeItem("cestaIds");
    let date = Date.now();
    localStorage.setItem("date",(date))
}
botonCarrito.addEventListener("mouseenter", (ev)=>{capaCarrito.style.display="inline-block";});
botonCarrito.addEventListener("mouseleave", (ev)=>{capaCarrito.style.display="none";});
searchInput.addEventListener("input", busqueda);
