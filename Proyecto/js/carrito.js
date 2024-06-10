document.addEventListener("DOMContentLoaded", () => {
    inicializarCarrito();
});

function inicializarCarrito() {
    const dateActual = Date.now();
    const dateStored = localStorage.getItem("date");

    if (!dateStored) {
        localStorage.setItem("date", dateActual);
    } else if (parseInt(dateStored) < (dateActual - 2000000)) {
        localStorage.removeItem("cesta");
        localStorage.removeItem("cestaIds");
        localStorage.setItem("date", dateActual);
    }

    carga();
}

function carga() {
    let cesta = JSON.parse(localStorage.getItem("cesta")) || [];
    let cestaIds = JSON.parse(localStorage.getItem("cestaIds")) || [];

    if (localStorage.cesta === "null" || localStorage.cestaIds === "null") {
        localStorage.removeItem("cesta");
        localStorage.removeItem("cestaIds");
        cesta = [];
        cestaIds = [];
    }

    localStorage.setItem("cesta", JSON.stringify(cesta));
    localStorage.setItem("cestaIds", JSON.stringify(cestaIds));

    cargaCarrito(cesta);
}

function cargaCarrito(cesta) {
    const carritoContainer = document.querySelector(".productsCarrito");
    const carritoVacio = document.getElementById("carritoVacio");
    const cestaIds = JSON.parse(localStorage.getItem("cestaIds")) || [];

 
    let html = "";
    if (cesta.length > 0) {
        cesta.forEach(element => {
            if (element) {
                const cantidad = cestaIds.filter(id => id.toString() === element.id.toString()).length;
                const precioTotal = element.precio * cantidad;


                html += `
                <div class="product-cart">
                    <img src="${element.image}" class="cart-img" alt="${element.name}"/>
                    <div class="content-cart">        
                        <p><b>${element.name}</b></p>
                        <span class="cantidad">Qty: ${cantidad} Kg</span>
                        <p>Total: ${precioTotal.toFixed(2)} €</p>
                        <p class="cambiarCantidad">
                            <button type="button" class="btn btn-danger" onClick="bajarCantidad(${element.id})">-</button>
                            <button type="button" class="btn btn-success" onClick="subirCantidad(${element.id})">+</button>
                        </p>
                        <p class="borrarProducto">
                            <button type="button" class="btn btn-primary" onClick="borrarProducto(${element.id})">Eliminar</button>
                        </p>
                    </div>
                </div>
                `;
            }
        });

        if (cestaIds.length > 0) {
            const checkout = "<div class='checkout'><button class='btn btn-primary' onclick='procesoPago()'>Checkout</button></div>";
            html += checkout;
            carritoVacio.style.display = "none";
            carritoContainer.innerHTML = html;
        } else {
            carritoVacio.style.display = "block";
            carritoContainer.innerHTML = "";
        }
    } else {
        carritoVacio.style.display = "block";
        carritoContainer.innerHTML = "";
    }
}

function bajarCantidad(id) {
    let cestaIds = JSON.parse(localStorage.getItem("cestaIds")) || [];
    const index = cestaIds.indexOf(id);
    if (index > -1) {
        cestaIds.splice(index, 1);
    }
    localStorage.setItem("cestaIds", JSON.stringify(cestaIds));

    if (!cestaIds.includes(id)) {
        borrarProducto(id);
    } else {
        carga();
    }
}

function subirCantidad(id) {
    let cestaIds = JSON.parse(localStorage.getItem("cestaIds")) || [];
    cestaIds.push(id);
    localStorage.setItem("cestaIds", JSON.stringify(cestaIds));
    carga();
}

function borrarProducto(id) {
    let cesta = JSON.parse(localStorage.getItem("cesta")) || [];
    let cestaIds = JSON.parse(localStorage.getItem("cestaIds")) || [];

  
    // ID es del mismo tipo que los IDs en cesta
    id = id.toString();

    // Eliminar el producto de la cesta
    cesta = cesta.filter(product => product.id.toString() !== id);
    // Eliminar todas las ocurrencias del ID del producto en cestaIds
    cestaIds = cestaIds.filter(productId => productId.toString() !== id);

    console.log("Después de borrar - cesta:", cesta); // Depuración
    console.log("Después de borrar - cestaIds:", cestaIds); // Depuración

    // Actualizar localStorage con los arrays modificados
    localStorage.setItem("cesta", JSON.stringify(cesta));
    localStorage.setItem("cestaIds", JSON.stringify(cestaIds));
    
    // Recargar el carrito para reflejar los cambios
    carga();
}

function procesoPago() {
    // Obtener la cesta y cestaIds actualizados
    let cesta = JSON.parse(localStorage.getItem("cesta")) || [];
    let cestaIds = JSON.parse(localStorage.getItem("cestaIds")) || [];

   
    alert("Proceso de pago no implementado.");

    // Actualizar los datos en localStorage para el proceso de pago
    localStorage.setItem("cesta", JSON.stringify(cesta));
    localStorage.setItem("cestaIds", JSON.stringify(cestaIds));

    // Recargar el carrito para reflejar los cambios
    carga();
}
