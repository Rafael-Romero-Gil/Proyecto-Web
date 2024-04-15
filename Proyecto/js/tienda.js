

const baseDeDatos = [
    {
        "id":1,
        "name": "Manzana Golden",
        "image": "../../imagenes/manzana golden.png",
        "info": "Manzana tono amarillo procedente de x",
        "precio": 1.20
    },
    {
        "id":2,
        "name": "Manzana Smith",
        "image": "../../imagenes/manzana smith.png",
        "info": "Manzana tono amarillo procedente de x",
        "precio": 1.40
    },
    {
        "id":3,
        "name": "Manzana fuji",
        "image": "../../imagenes/manzana fuji.png",
        "info": "Manzana tono amarillo procedente de x",
        "precio": 2
    },
    {
        "id":1,
        "name": "Manzana Golden",
        "image": "../../imagenes/manzana golden.png",
        "info": "Manzana tono amarillo procedente de x",
        "precio": 1.20
    },
    {
        "id":2,
        "name": "Manzana Smith",
        "image": "../../imagenes/manzana smith.png",
        "info": "Manzana tono amarillo procedente de x",
        "precio": 1.40
    },
    {
        "id":3,
        "name": "Manzana fuji",
        "image": "../../imagenes/manzana fuji.png",
        "info": "Manzana tono amarillo procedente de x",
        "precio": 2
    }
];

document.addEventListener("DOMContentLoaded", () => {
    loadProductos();
});

async function loadProductos() {
    const products = baseDeDatos;

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
                <button type="button" class="btn btn-primary">Añadir al carrito</button>
            </div>
        </div>
        `;
    });
    document.getElementsByClassName("products") [0].innerHTML = html;
}