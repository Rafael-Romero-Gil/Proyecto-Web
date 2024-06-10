<?php
require './plantilla/header.php';
?>
<link rel="stylesheet" href="css/index.css" type="text/css">
</head>
<?php
require './plantilla/menu.php';
require './db/conexion.php';

if(isset($_POST['correo'])&& $_POST['passwd']){
    
    
    
    $correo=$_POST['correo'];
    $passwd=$_POST['passwd'];
    
    $query = "SELECT * FROM usuarios WHERE correo='$correo'";
    
    $ejecutar = mysqli_query($conexion, $query);
    
    if($ejecutar && mysqli_num_rows($ejecutar)>0){
        
        $fila = mysqli_fetch_assoc($ejecutar);
        
        $haspas= $fila['password'];
        
        if(password_verify($passwd, $haspas)){
            
            header('location:index.php');
            exit();
        }else{
            echo 'contraseña INCORRECTA';
        }
    }
}

?>
<div class="container bg-light mx-auto pb-5 " style="margin-top:80px;margin-bottom: 0px;padding:0px;">
    <img src="./resources/home1.png" class="img-fluid">
    <h1 style="text-align: center">Login</h1>
    
    <div class="col-md-4 mx-auto pt-3" >    
        <p class="text-center">Si aun no te has registrado haz click <a href="registro.php">aquí</a></p>    
    <form action="" method="POST">
        <div class="form-group">
            <label for="correo">Correo:</label>
            <input type="mail" class="form-control" name="correo" id="correo" placeholder="Introduzca su dirección de Correo:" required>            
        </div>
        
        <div class="form-group pt-3">
            <label for="passwd">Contraseña:</label>
            <input type="password" class="form-control" name="passwd" id="passwd" placeholder="Introduzca su Contraseña:" required>            
        </div>
        <button type="submit" class="btn btn-success mt-4" style="width: 100%;text-align: center">Enviar</button>
        
        
        
    </form>
    
    
</div>
   
</div>



<<?php
require './plantilla/footer.php';
?>