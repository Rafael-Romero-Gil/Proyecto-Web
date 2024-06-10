<?php

$conexion = mysqli_connect('localhost', 'root', '') or die ('Error de conexion');
$db = mysqli_select_db($conexion, 'tienda') or die ('Error de conexion');
