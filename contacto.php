<?php
require './plantilla/header.php';
?>
<link rel="stylesheet" href="css/index.css" type="text/css">
</head>
<?php
require './plantilla/menu.php';
?>
<div class="container bg-light mx-auto pb-3" style="margin-top:80px;margin-bottom: 0px;padding:0px;">
    <img src="./resources/home1.png" class="img-fluid">   
</div>
<div class="container bg-light mx-auto pt-3 pb-3"">
    <div class="row">
    <h1 class="pb-3 border-bottom">Contacto</h1>
    <div class="col-6 mx-auto p-5 border-end">
        <h4>ENVIANOS UN EMAIL</h4>
        <form action="enviar.php" method="post">
            <label for="nombre" class="form-label">Nombre:*</label>
            <input type="text" class="form-control mb-1" name="nombre" id="nombre" placeholder="Nombre">
            <label for="mail" class="form-label">Mail:*</label>
            <input type="email" class="form-control mb-1" name="mail" id="mail" placeholder="Mail">
            <label for="telefono" class="form-label">Numero de Telefono:</label>
            <input type="tel" class="form-control mb-1" name="telefono" id="telefono" placeholder="Numero de Telefono">
            <label for="mesaje" class="form-label">Mensaje:*</label>
            <textarea class="form-control mb-3" name="mensaje" id="mensaje" ></textarea>
            <input type="submit" class="btn btn-primary" value="Enviar">
        </form> 
    </div>
    <div class="col-6 mx-auto p-5">        
        <h3>Informacion Fruteria</h3>
        <p style="font-size: 20px">
            Si necesitas contactar con nosotros porque tiene alguna duda, consulta o un comentario para poder mejorar tanto nuestra tienda online, nuestro servicio a domicilio o nuestras tiendas físicas, por favor siéntete libre de rellenar nuestro formulario de contacto. 
        </p>
        <h3 class="mt-5">Contacto</h3>
        <div class="row row-cols-2">
            <div class="col ps-5">
                <p>&#9743;<b> Telefono</b></p>
                <p style="color: orangered">123-456-789</p>
            </div>
            <div class="col ps-5">
                <p>&#x1f4e7;<b> Email</b></p>
                <p style="color: orangered">contacto@ejemplo.com</p>
            </div>
            <div class="col ps-5">
                <p>&#x1f4ac;<b> Pedidos Whatsapp</b></p>
                <p style="color: orangered">123-456-789</p>
            </div>
            <div class="col ps-5">
                <p>&#x1f3e0;<b> Direccion:</b><a> Calle Ejemplo 123, Ciudad, País</a></p>               
            </div>
        </div>
    </div>
    </div>
</div>
<div class="container bg-light mx-auto pt-3 pb-3"">
    <div class="col-12 mx-auto pt-3">        
        <iframe class="w-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d760.0339615923998!2d-3.661648600374075!3d40.361512100000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4227ac5b1b2421%3A0x5f42f900b8aafb44!2sFrutas%20y%20verduras%20del%20pa%C3%ADs!5e0!3m2!1ses!2sus!4v1717958407701!5m2!1ses!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
</div>

<?php
require './plantilla/footer.php';
?>