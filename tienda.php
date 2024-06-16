<?php
require './plantilla/header.php';
?>
<link rel="stylesheet" href="css/tienda.css" type="text/css">
</head>
<?php
require './plantilla/menu.php';
?>
<div class="container2">
    <img src="./resources/home1.png" class="img-fluid">
</div>
<div class="container mx-auto" style="margin-top:80px;margin-bottom: 0px;">
    <div class="baseBuscador m-3 p-3">
        <div class="buscador">
          <input type="text" placeholder="Buscar" class="buscar form-control" id="buscar">
        </div>
        <div class="orden ms-4 me-4">
            <button class="bdesple"><a href="#demo0" class="tipos" data-bs-toggle="collapse">Ordenar &#8595;</a></button>
            <div id="demo0" class="collapse p-1">
              <button class="btn btn-primary m-1 ord" onClick=(ordenarTemporada())>Temporada</button>
              <button class="btn btn-primary m-1 ord" onClick=(ordenarFamilia())>Familia</button>
              <button class="btn btn-primary m-1 ord" onClick=(ordenarPrecio())>Precio</button>
            </div>
      </div>
      <div class="orden">
        <button class="bcarrito" id="bCarrito" onclick="location.href='carrito.php';"><a class="tipos">&#x1f6d2;</a></button>
      </div>
      
    </div>
    <div class="listaCompra" id="listaCompra"></div> 
</div>


<div class="relleno row m-3">
    <div class="filtros col">
      <div class="">
        <h4>Filtros</h4>
          <div class="filter-container">
          </div>     
      </div>     
    </div>  
    <div class="col">
      <div class="contenido">
          <div class="products">
          </div>
      </div>
    </div>  
  </div>
  <div class="">
    <div class="alertCompra" id="alertaC">
    </div>
  </div>
<script src="js/tienda.js"></script> 
<?php
require './plantilla/footer.php';
?>