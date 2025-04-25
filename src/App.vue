<template>
  <div id="app">
    <nav class="top-full-width-nav-horizontal">
      <router-link to="/tours">Tours</router-link>
      <router-link to="/sobre-nosotros">Sobre Nosotros</router-link>
      <router-link to="/contacto">Contacto</router-link>
      <router-link to="/destinos-populares">Destinos Populares</router-link>
      <router-link to="/actividades">Actividades</router-link>
      <router-link to="/galeria">Galería</router-link>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
body {
  margin: 0; /* Aseguramos que no haya margen en el body */
  padding: 0; /* Aseguramos que no haya padding en el body */
}

#app {
  font-family: 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
  position: relative; /* Necesario para posicionar la navegación */
  width: 100%; /* Aseguramos que #app también ocupe todo el ancho */
}

nav.top-full-width-nav-horizontal {
  background-color: #343a40; /* Un color gris oscuro elegante */
  color: #ffffff;
  padding: 15px 20px; /* Añadimos un poco de padding horizontal */
  position: fixed; /* Posicionamiento fijo en la parte superior */
  top: 0;
  left: 0;
  width: 100%; /* Ocupar todo el ancho */
  z-index: 10; /* Asegurar que esté por encima de otros elementos */
  display: flex; /* Alinear los enlaces horizontalmente */
  align-items: center; /* Centrar verticalmente los enlaces */
  justify-content: flex-start; /* Alinear los elementos al inicio (izquierda) */
}

nav.top-full-width-nav-horizontal a {
  font-weight: bold;
  color: #ffffff;
  margin-right: 15px; /* Espacio entre enlaces horizontal */
  text-decoration: none;
  transition: color 0.3s;
}

nav.top-full-width-nav-horizontal a:last-child {
  margin-right: 0; /* Eliminar el margen del último enlace */
}

nav.top-full-width-nav-horizontal a:hover {
  color: #adb5bd; /* Un gris más claro para el hover */
}

main {
  padding: 20px; /* Restauramos el padding original */
  margin-top: 60px; /* Ajustar el margen superior para evitar la superposición (ajusta según la altura de tu nav) */
  width: 100%; /* Aseguramos que main también ocupe todo el ancho */
}
</style>