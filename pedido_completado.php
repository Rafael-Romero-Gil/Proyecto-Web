<?php
require './plantilla/header.php';
?>
<link rel="stylesheet" href="css/index.css" type="text/css">
<link rel="stylesheet" href="css/firework.css" type="text/css">
</head>
<?php
require './plantilla/menu.php';
?>
<div class="container bg-light mx-auto pb-3" style="margin-top:80px;margin-bottom: 0px;padding:0px;">
    <img src="./resources/home1.png" class="img-fluid">   
</div>
<div class="container bg-light mx-auto pb-3">
    <div class="col mx-auto text-center pt-3">          
        <h1 class="m-5 mb-5">PEDIDO REALIZADO CON EXITO</h1>
        <button class="btn btn-success mb-5" id="bVolver"  onclick="window.location.href='tienda.php'">Volver</button>
        
            <div class="firework"></div>
            <div class="firework"></div>
            <div class="firework"></div>
            <div class="firework"></div>
            <div class="firework"></div>
     </div>
</div>
<script>
    
    localStorage.removeItem('cesta');
    localStorage.removeItem('cantidades');
    localStorage.removeItem('total');
    
   
   
    
    
    
</script>
<?php
require './plantilla/footer.php';
?>