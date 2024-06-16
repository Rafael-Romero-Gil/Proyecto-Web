<?php
require './plantilla/header.php';
?>
<link rel="stylesheet" href="css/carrito.css" type="text/css">
</head>
<?php
require './plantilla/menu.php';
?>
   <div class="container mx-auto pb-5" style="margin-top:80px;margin-bottom: 0px;">
        <div class="d-grid">
            <div class="carrito m-3 p-2" id="cCarrito">
                <div class="carritoInner">
                    <div class="carritoVacio" id="carritoVacio">
                        Sin articulos en cesta
                    </div>
                    <div class="productsCarrito"></div>
                </div>
            </div>
        </div>
    </div>
    <script src="js/carrito.js"></script> 

<?php
require './plantilla/footer.php';
?>