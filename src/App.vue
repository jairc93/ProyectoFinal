<template>
  <div id="app">
    <nav>
      <router-link to="/">Inicio</router-link>
      <router-link to="/tours">Tours</router-link>
      <router-link to="/sobre-nosotros">Sobre Nosotros</router-link>
      <router-link to="/pokemon">Pokemon</router-link>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
#app {
  font-family: 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
}

nav {
  background-color: #007bff;
  padding: 20px;
}

nav a {
  font-weight: bold;
  color: #ffffff;
  margin: 0 15px;
  text-decoration: none;
  transition: color 0.3s;
}

nav a:hover {
  color: #ffdd57;
}

main {
  padding: 20px;
}
</style>
