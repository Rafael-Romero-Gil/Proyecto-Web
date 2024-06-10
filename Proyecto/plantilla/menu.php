<div class="nav-container">
        <div class="nav-content">
            <a href="index.php" class="nav-logo">Frutería Paquito</a>
            <div class="burger">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <nav class="nav-menu">
                <a href="index.php">Inicio</a>
                <a href="tienda.php">Tienda</a>
                <a href="preguntas_frecuentes.php">Preguntas Frecuentes</a>
                <a href="contacto.php">Contacto</a>
                <a href="login.php">Login</a>
            </nav>           
        </div>
    </div>  
    <script>
        const burger = document.querySelector('.burger');
        const navContainer = document.querySelector('.nav-container');

        burger.addEventListener('click', () => {
            navContainer.classList.toggle('active');
        });
    </script>