var capaCarrito = document.getElementById("cCarrito");
var capaCarritoVacio = document.getElementById("carritoVacio");
var cesta = [];
var cestaIds = [];

function carga(){
    
    cesta = JSON.parse(localStorage.getItem("lista"));
    cestaIds = JSON.parse(localStorage.getItem("listaIds"));

    if(localStorage.cesta==="null"){
        localStorage.removeItem("cesta");
        localStorage.removeItem("cestaIds");
    }

    if(localStorage.length<4){
        if(cesta!=null){
            localStorage.setItem("cesta", JSON.stringify(cesta));
            localStorage.setItem("cestaIds", JSON.stringify(cestaIds));
        }else{
            cesta = JSON.parse(localStorage.getItem("cesta"));
        cestaIds = JSON.parse(localStorage.getItem("cestaIds"));
        }

    }else{
        let cestaAmpliada= JSON.parse(localStorage.getItem("cesta"));
        let cestaIdsAmpliada= JSON.parse(localStorage.getItem("cestaIds"));
        cestaIds = cestaIds.concat(cestaIdsAmpliada);
        cesta = cesta.concat(cestaAmpliada); 

        var hash = {};
        cesta = cesta.filter(function(current) {
            var exists = !hash[current.id];
            hash[current.id] = true;
            return exists;
        });

        localStorage.setItem("cesta", JSON.stringify(cesta));
        localStorage.setItem("cestaIds", JSON.stringify(cestaIds));
    }
    localStorage.removeItem("lista");
    localStorage.removeItem("listaIds");

    cargaCarrito(cesta);
};

async function cargaCarrito(cesta){
    
    let html = "";
    if(localStorage.cesta!=="null"){
    cesta.forEach(element => {
        if (element != null) {
            let cantidad = 0;
            cestaIds.forEach(id => {
                if (id === element.id) {
                    cantidad++;
                }
            });
            let precioTotal = element.precio * cantidad;

            html += `
        <div class="product-cart">
            <img src="${element.image}" class="cart-img" alt="${element.name}"/>
            <div class="content-cart">        
                <p><b>${element.name}</b></p>
                <span class="cantidad">Qty: ${cantidad}Kg</span>
                <p>Total: ${precioTotal.toFixed(2)}€</p>
                <p class="cambiarCantidad">
                    <button type="button" class="btn btn-danger" onClick="bajarCantidad(${element.id})">-</button>
                    <button type="button" class="btn btn-success" onClick="subirCantidad(${element.id})">+</button>
                </p>
                <p class="borrarProducto">
                    <button type="button" class="btn btn-primary"  onClick="borrarProducto(${element.id})">Eliminar</button>
                </p>
            </div>
        </div>
        `;
        }
    });
    let x = 0;
    cestaIds.forEach(element => {x += element});
    if(x >0){
    const checkout ="<div class='checkout'><button class='btn btn-primary' onclick='procesoPago'>Checkout</button></div>";
    html += checkout;
    capaCarritoVacio.style.display="none";  
    document.getElementsByClassName("productsCarrito") [0].innerHTML = html;
    }else{
    capaCarritoVacio.style.display="flex"; 
    document.getElementsByClassName("productsCarrito") [0].innerHTML = html;
    }

    }

}

async function bajarCantidad(id){
    let cestaIdsMenos = JSON.parse(localStorage.getItem("cestaIds"));
    for (let y = 0;y<cestaIdsMenos.length;y++){
        if(cestaIdsMenos[y]===id){
            cestaIdsMenos[y]=0;
            localStorage.setItem("cestaIds", JSON.stringify(cestaIdsMenos));
            break;
        }
    }
    carga();
};

async function subirCantidad(id){
    let cestaIdsMas = JSON.parse(localStorage.getItem("cestaIds"));
    cestaIdsMas.push(id);
    localStorage.setItem("cestaIds", JSON.stringify(cestaIdsMas));
    carga();
};

async function borrarProducto(id){
    let cestab = JSON.parse(localStorage.getItem("cesta"));
    let cestaIdsb = JSON.parse(localStorage.getItem("cestaIds"));
    localStorage.removeItem("cesta");
    localStorage.removeItem("cestaIds");

    for (let y = 0; y < cestab.length; y++) {
        if (cestab[y] != null) {
            if (cestab[y].id === id) {
                cestab.splice(y,1);
            }
        }

    };
    for (let y = 0; y < cestaIdsb.length; y++) {
        if (cestaIdsb[y] === id) {
            cestaIdsb[y] = 0;
        }
    };
    localStorage.setItem("cesta", JSON.stringify(cestab));
    localStorage.setItem("cestaIds", JSON.stringify(cestaIdsb));
    carga();
};


document.addEventListener("DOMContentLoaded", () => {
    var dateActual = Date.now();
    if(localStorage.length<3){
        let date = Date.now();
        localStorage.setItem("date",(date));
    }else if(localStorage.getItem("date")<(dateActual-2000000)){
        localStorage.removeItem("cesta");
        localStorage.removeItem("cestaIds");
        let date = Date.now();
        localStorage.setItem("date",(date))
    }
    carga();
});

