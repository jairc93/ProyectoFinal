<template>
  <div class="about-us-page">
    <BannerPrincipal />

    <div class="about-us-content">
      <h1>Sobre Nosotros</h1>
      <p class="intro">
        Somos una empresa local apasionada por revelar las joyas de Santa Marta y sus alrededores a viajeros como tú.
      </p>
      <div class="mission-vision">
        <div class="mission">
          <h2>Nuestra Misión</h2>
          <p>
            Promover un turismo consciente y respetuoso, creando conexiones auténticas entre nuestros visitantes y la riqueza cultural y natural de nuestra tierra. Nos esforzamos por ofrecer experiencias memorables, marcadas por la calidad y la calidez de nuestro equipo.
          </p>
        </div>
        <div class="vision">
          <h2>Nuestra Visión</h2>
          <p>
            Ser la agencia de viajes líder en la región, reconocida por nuestra innovación, compromiso con la sostenibilidad y la capacidad de superar las expectativas de nuestros clientes, contribuyendo al desarrollo positivo de nuestra comunidad.
          </p>
        </div>
      </div>
      <p class="contact-info">
        ¿Listo para explorar con nosotros? No dudes en <router-link to="/contacto" class="contact-link">ponerte en contacto</router-link> o descubrir nuestros increíbles <router-link to="/tours" class="tours-link">tours</router-link>.
      </p>
    </div>
  </div>
</template>

<script>
import BannerPrincipal from '@/components/BannerPrincipal.vue'; // Importa el componente del banner

export default {
  name: "SobreNosotros",
  components: {
    BannerPrincipal // Registra el componente
  },
};
</script>

<style scoped>
.about-us-page {
  background: linear-gradient(to bottom, #f9f9f9, #fff); /* Fondo sutil */
  padding-bottom: 60px; /* Espacio inferior para el pie de página (si lo hay) */
}

.about-us-content {
  max-width: 960px; /* Ancho máximo para el contenido */
  margin: 40px auto; /* Centrado con margen superior e inferior */
  padding: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Sombra suave */
  text-align: center;
}

h1 {
  color: #333;
  font-size: 2.8em;
  margin-bottom: 30px;
  letter-spacing: -0.5px;
}

.intro {
  color: #555;
  font-size: 1.2em;
  line-height: 1.7;
  margin-bottom: 30px;
}

.mission-vision {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.mission,
.vision {
  padding: 30px;
  background-color: #f4f4f4;
  border-radius: 10px;
  text-align: left;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06); /* Sombra sutil para las secciones */
}

.mission h2,
.vision h2 {
  color: #007bff; /* Color acento */
  font-size: 1.6em;
  margin-top: 0;
  margin-bottom: 15px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 8px;
}

.mission p,
.vision p {
  color: #666;
  font-size: 1em;
  line-height: 1.6;
  margin-bottom: 0;
}

.contact-info {
  color: #777;
  font-size: 1.1em;
  line-height: 1.8;
  margin-top: 30px;
}

.contact-link,
.tours-link {
  color: #007bff; /* Color acento para los enlaces */
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.contact-link:hover,
.tours-link:hover {
  color: #0056b3; /* Oscurecer al hacer hover */
}
</style>