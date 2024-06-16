<?php
session_start();
/**
 * Comprueba si la sesion esta iniciada he guarda en la base de datos los detalles del pedido
 * tambienresta los productos pertinentes del stock de la base de datos
 * @author Rafael Romero Gil & Jesus Cuadrado Lopez
 */
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}
require './plantilla/header.php';
require './db/conexion.php';  // Ajustar la ruta al archivo de conexión

$user_id = $_SESSION['user_id'];

/**
 * Consulta para obtener la información del usuario
 */
$query = $conexion->prepare("SELECT nombre, correo, direccion, localidad FROM usuarios WHERE id = ?");
$query->bind_param("i", $user_id);
$query->execute();
$result = $query->get_result();
$user = $result->fetch_assoc();

?>
<link rel="stylesheet" href="css/index.css" type="text/css">
<link rel="stylesheet" href="css/resumenpedido.css" type="text/css">

</head>
<?php
require './plantilla/menu.php';
?>
<div class="container bg-light mx-auto" style="margin-top:80px;margin-bottom: 0px;padding:0px;">
    <img src="./resources/home1.png" class="img-fluid">   
</div>
<div class="container bg-light mx-auto pb-3">
    <div class="m-5 mt-0">
    <h1 class="mb-4 ms-3 border-bottom">Resumen del Pedido</h1>
    <div id="resumen" class="contenido ms-2"></div>
    <div class="row mt-4 ms-2">
        <div class="col-12 d-flex justify-content-between align-items-center">
            <h2 class="border-bottom border-dark">Total de la Cesta: <span id="totalCesta">$0.00</span> (IVA incluido)</h2>
            <form id="paymentForm" action="procesar_pago.php" method="POST" style="display: none;">
                <input type="hidden" name="cesta" id="cestaInput">
                <input type="hidden" name="cantidades" id="cantidadesInput">
                <input type="hidden" name="total" id="totalInput">
            </form>
        </div>
    </div>
    <div class="row mt-4 ms-2">
        <div class="col-12 border">
            <h3>Información del Usuario</h3>
            <p><strong>Nombre:</strong> <?php echo ($user['nombre']); ?></p>
            <p><strong>Correo:</strong> <?php echo ($user['correo']); ?></p>
            <p><strong>Dirección:</strong> <?php echo ($user['direccion']); ?></p>
            <p><strong>Localidad:</strong> <?php echo ($user['localidad']); ?></p>
        </div>
    </div>
    <div class="mt-4">
        <button id="proceedToPayment" class="btn btn-primary ms-3">Proceder al Pago</button>
    </div>
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        /**
         * Recuperar los datos de localStorage
         * @constant array cesta - Arrays de los productos en la cesta
         * @constant array cantidades -  Array con las cantidades de los productos en la cesta
         */ 
        let cesta = JSON.parse(localStorage.getItem("cesta")) || [];
        let cantidades = JSON.parse(localStorage.getItem("cantidades")) || {};

        
        let totalCesta = 0;
        /**
         * Calcular el total de la cesta y muestra los datos en la página
         */
        let resumen = document.getElementById("resumen");
        if (cesta.length > 0) {
            cesta.forEach(producto => {
                let cantidad = cantidades[producto.id] || 0;
                let subtotal = cantidad * parseFloat(producto.precio);
                totalCesta += subtotal;

                let item = document.createElement("div");
                item.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${producto.name}</h5>
                                <img src="${producto.image}" class="card-img" alt="${producto.name}"/>
                                <h6 class="card-text">Precio: $${parseFloat(producto.precio).toFixed(2)}</h6>
                                <h6 class="card-text">Cantidad: ${cantidad}Kg</h6>
                                <h6 class="card-text">Subtotal: $${subtotal.toFixed(2)}</h6>
                            </div>
                        </div>
                `;
                resumen.appendChild(item);
            });

            /**
             * Mostrar el total de la cesta
             */
            document.getElementById("totalCesta").textContent = `$${totalCesta.toFixed(2)}`;
        } else {
            resumen.innerHTML = "<p class='col-12'>No hay productos en la cesta.</p>";
        }
        document.getElementById("proceedToPayment").addEventListener("click", function() {
        let cesta = localStorage.getItem("cesta");
        let cantidades = localStorage.getItem("cantidades");
        let total = document.getElementById("totalCesta").textContent.replace('$', '');

        document.getElementById("cestaInput").value = cesta;
        document.getElementById("cantidadesInput").value = cantidades;
        document.getElementById("totalInput").value = total;

        document.getElementById("paymentForm").submit();
    });
    });
</script>

<?php
require './plantilla/footer.php';
?>
