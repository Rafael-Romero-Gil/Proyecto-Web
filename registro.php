<?php
require './plantilla/header.php';
?>
<link rel="stylesheet" href="css/index.css" type="text/css">
</head>
<div class="container bg-light mx-auto pb-5 " style="margin-top:80px;margin-bottom: 0px;padding:0px;">
    <img src="./resources/home1.png" class="img-fluid">
    <h1 style="text-align: center">Registro</h1>
    
   <div class="col-md-4 mx-auto">
<?php
require './plantilla/menu.php';
require './db/conexion.php';

/**
 * Comprueba si los datos han sido enviados mediante el metodo post y los almacena en variables,
 * verifica que no existan duplicados en la base de datos sobre correo y ejecuta un insert de estos
 * datos en la tabla usuarios
 * @author Rafael Romero Gil & Jesus Cuadrado Lopez
 * @var string nombre - Dato tomado del formulario de registro
 * @var string apellido - Dato tomado del formulario de registro
 * @var string correo - Dato tomado del formulario de registro
 * @var string telefono - Dato tomado del formulario de registro
 * @var string direccion - Dato tomado del formulario de registro
 * @var string localidad - Dato tomado del formulario de registro
 * @var string passwd - Dato tomado del formulario de registro y encriptado
 */

if(isset($_POST['nombre']) && isset($_POST['apellido']) && isset($_POST['correo']) && isset($_POST['telefono']) && isset($_POST['direccion']) && isset($_POST['localidad']) && isset($_POST['passwd'])) {
  
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];
    $direccion = $_POST['direccion'];
    $localidad = $_POST['localidad'];
    $passwd = password_hash($_POST['passwd'], PASSWORD_DEFAULT);

    // Verificar si el correo ya existe
    $checkEmailQuery = "SELECT * FROM usuarios WHERE correo = '$correo'";
    $result = mysqli_query($conexion, $checkEmailQuery);

    if (!$result) {
        die('Error en la consulta: ' . mysqli_error($conexion));
    }

    if(mysqli_num_rows($result) > 0) {
        // El correo ya existe
        echo '<div class="alert alert-danger text-center" role="alert">El correo ya está registrado.</div>';
    } else {
        // El correo no existe, proceder con la inserción
        $sql = "INSERT INTO usuarios (nombre, apellido, correo, telefono, direccion, localidad, password) 
                VALUES ('$nombre', '$apellido', '$correo', '$telefono', '$direccion', '$localidad', '$passwd')";
        $ejecutar = mysqli_query($conexion, $sql);

        if($ejecutar) {
            header("Location: ./login.php");
            exit();
        } else {
            echo "Error al registrar: " . mysqli_error($conexion);
        }
    }
}   
?>


    
    
    <form action="<?= $_SERVER['PHP_SELF'] ?>" method="POST">
        <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input class="form-control" type="text" name="nombre" id="nombre" placeholder="Introduzca su nombre" required>  
        </div>
        
        <div class="form-group pt-3">
            <label for="apellido">Apellido:</label>
            <input class="form-control" type="text" name="apellido" id="apellido" placeholder="Introduzca su apellido" required>  
        </div>
        
         <div class="form-group pt-3">
            <label for="correo">Correo:</label>
            <input class="form-control" type="mail" name="correo" id="correo" placeholder="Introduzca su correo" required>  
        </div>
        
         <div class="form-group pt-3">
            <label for="telefono">Telefono:</label>
            <input class="form-control" type="tel" name="telefono" id="telefono" placeholder="Introduzca su telefono" required>  
        </div>
        
         <div class="form-group pt-3">
            Direccion:
            <input class="form-control" type="text" name="direccion" id="direccion" placeholder="Introduzca su direccion" required>  
        </div>
        
         <div class="form-group pt-3">
            <label for="localidad">Localidad:</label>
            <input class="form-control" type="text" name="localidad" id="localidad" placeholder="Introduzca su localidad" required>  
        </div>
        
          <div class="form-group pt-3">
            <label for="passwd">Contraseña:</label>
            <input class="form-control" type="password" name="passwd" id="localidad" placeholder="Introduzca su contraseña" required>  
        </div>      
        <button type="submit" class="btn btn-success mt-4" style="width: 100%;text-align: center;">Enviar</button>          
    </form>   
</div> 
</div>

<<?php
require './plantilla/footer.php';
?>