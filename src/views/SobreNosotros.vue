<template>
  <div class="sobre-nosotros">
    <img v-if="banner" :src="banner.imagen" class="banner" :alt="banner.titulo" />

    <h1>Sobre Nosotros</h1>
    <p>
      Somos una empresa local comprometida con ofrecer experiencias turísticas únicas en Santa Marta y sus alrededores.
    </p>
    <p>
      Nuestra misión es promover el turismo sostenible, conectar a los viajeros con la riqueza cultural y natural de nuestra región,
      y brindar un servicio de calidad con calidez humana.
    </p>
    <p>
      Si deseas saber más sobre nosotros, no dudes en ponerte en contacto con nosotros o explorar nuestra página de tours.
    </p>
  </div>
</template>

<script>
export default {
  name: "SobreNosotros",
  data() {
    return {
      banner: null,
    };
  },
  mounted() {
    fetch("http://localhost:3000/api/tours/banners/1") // Ajusta si el ID cambia
      .then((res) => res.json())
      .then((data) => {
        this.banner = data;
      })
      .catch((err) => console.error("Error cargando el banner:", err));
  },
};
</script>

<style scoped>
.sobre-nosotros {
  max-width: 800px;
  margin: auto;
  text-align: center;
  padding: 20px;
}

.banner {
  width: 50%;
  height: auto;
  border-radius: 10px;
  margin: 0 auto 20px auto;
  display: block;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

p {
  font-size: 1.2em;
  line-height: 1.6;
  margin-bottom: 20px;
}
</style>
