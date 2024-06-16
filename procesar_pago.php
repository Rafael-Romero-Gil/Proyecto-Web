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
require './db/conexion.php';  // Ajustar la ruta al archivo de conexión
/**
 * Variables tomadas de la cesta para la base de datos
 * @var number user_id - Numero de id del usuario que realiza el pedido
 * @var array cesta - Arrays de los productos en la cesta
 * @var array cantidades -  Array con las cantidades de los productos en la cesta
 * @var number total - Precio total de los articulos en la cesta
 */
$user_id = $_SESSION['user_id'];
$cesta = json_decode($_POST['cesta'], true);
$cantidades = json_decode($_POST['cantidades'], true);
$total = floatval($_POST['total']);

$conn = $conexion;

/**
 * Inserta el nuevo pedido en la base de datos
 */
$query = $conn->prepare("INSERT INTO pedidos (usuario_id, fecha, estado, total) VALUES (?, NOW(), 'Pendiente', ?)");
$query->bind_param("id", $user_id, $total);

/**
 * Verifica que se realizase el Insert de pedidos
 */
if ($query->execute()) {
    $pedido_id = $query->insert_id;

    /**
     * Inserta los detalles del pedido y actualizar el stock
     */
    foreach ($cesta as $producto) {
        $producto_id = $producto['id'];
        $cantidad = $cantidades[$producto_id];
        $precio = floatval($producto['precio']);

        // Insertar detalles del pedido
        $query = $conn->prepare("INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)");
        $query->bind_param("iiid", $pedido_id, $producto_id, $cantidad, $precio);
        $query->execute();

        // Actualizar el stock del producto
        $query = $conn->prepare("UPDATE productos SET stock = stock - ? WHERE id = ?");
        $query->bind_param("ii", $cantidad, $producto_id);
        $query->execute();
    }

    header("Location:./pedido_completado.php");
} else {
    echo "Error al procesar el pedido: " . $conn->error;
}

$conn->close();
?>
