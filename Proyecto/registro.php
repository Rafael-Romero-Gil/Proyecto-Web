<?php
require './plantilla/header.php';
?>
<link rel="stylesheet" href="css/index.css" type="text/css">
</head>
<?php
require './plantilla/menu.php';
require './db/conexion.php';

if(isset($_POST['nombre']) && isset($_POST['apellido']) && isset($_POST['correo']) && isset($_POST['telefono']) && isset($_POST['direccion']) && isset($_POST['localidad']) && isset($_POST['passwd'])){
    
    
    
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];
    $direccion = $_POST['direccion'];
    $localidad = $_POST['localidad'];
    $passwd = password_hash($_POST['passwd'], PASSWORD_DEFAULT);
    
    $sql="INSERT INTO usuarios (nombre,apellido,correo,telefono,direccion,localidad,password) values('$nombre','$apellido','$correo','$telefono','$direccion','$localidad','$passwd')";
    $ejecutar= mysqli_query($conexion, $sql);
}
    
?>

<div class="container bg-light mx-auto pb-5 " style="margin-top:80px;margin-bottom: 0px;padding:0px;">
    <img src="./resources/home1.png" class="img-fluid">
    <h1 style="text-align: center">Registro</h1>
    
   <div class="col-md-4 mx-auto">
    
    
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