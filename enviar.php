<?php

if($_SERVER['REQUEST_METHOD'] === 'POST'){
$nombre = $_POST['nombre'];
$mail = $_POST['mail'];
$telefono = $_POST['telefono'];
$mensaje = $_POST['mensaje'];

$header = 'From: ' . $mail . "\r\n";
$header .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$header .= "Mime-Version: 1.0 \r\n";
$header .= "Content-Type: text/plain";

$mensaje = "Este mensaje fue enviado por: " . $nombre . " \r\n";
$mensaje .= "Su email es: " . $mail . " \r\n";
$mensaje .= "Su telefono de contacto es: " . $telefono . " \r\n";
$mensaje .= "Mensaje: " . $_POST['mensaje'] . " \r\n";
$mensaje .= "Enviado el: " . date('d/m/y', time());

$para = "romerogil.rafael@gmail.com";
$asunto = "Formulario de contacto web";

$ejecutar = mail($para, $asunto, $mensaje, $header);
if($ejecutar){
    echo "Correo enviado";
}else{
    echo "Error";
}
}
?>