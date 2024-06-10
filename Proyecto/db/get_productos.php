<?php

header('Content-Type: application/json');

$conexion = mysqli_connect('localhost', 'root', '') or die ('Error de conexion');

$db = mysqli_select_db($conexion, 'tienda') or die ('Error de conexion');

$sql = "SELECT * FROM productos";
$result = mysqli_query($conexion, $sql);

$productos = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
}

// Convertir a JSON y devolver
echo json_encode($productos);

