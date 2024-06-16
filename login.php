<?php
session_start();
require './plantilla/header.php';
?>
<link rel="stylesheet" href="css/index.css" type="text/css">
</head>
<?php
require './plantilla/menu.php';
require './db/conexion.php';


if (isset($_POST['correo']) && isset($_POST['passwd'])) {
    $correo = $_POST['correo'];
    $passwd = $_POST['passwd'];

    // Consulta para obtener el usuario
    $sql = "SELECT * FROM usuarios WHERE correo = '$correo'";
    $result = mysqli_query($conexion, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);

        // Verificar la contraseña
        if (password_verify($passwd, $user['password'])) {
            // Iniciar la sesión
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['correo'];

            // Verificar si el usuario es administrador
            if ($user['correo'] === 'admin@admin.com') { 
                $_SESSION['admin']=1;
                header("Location:./admin/todos_pedidos.php");
                exit();
            } else {
                header("Location: tienda.php");
            }
            exit();
        } else {
            echo '<div class="alert alert-danger text-center" role="alert">Contraseña incorrecta.</div>';
        }
    } else {
        echo '<div class="alert alert-danger text-center" role="alert">El correo no está registrado.</div>';
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