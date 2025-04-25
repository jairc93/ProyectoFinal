<template>
  <div class="gallery-page">
    <h1>Nuestra Galería de Imágenes</h1>
    <div class="image-grid">
      <div
        v-for="imagen in imagenes"
        :key="imagen.id"
        class="image-item"
        @click="mostrarImagenAmpliada(imagen)"
      >
        <div class="image-wrapper">
          <img :src="imagen.url_imagen" :alt="imagen.nombre_lugar" class="thumbnail" />
        </div>
        <p class="location-name">{{ imagen.nombre_lugar }}</p>
      </div>
    </div>

    <div v-if="imagenAmpliada" class="lightbox" @click.self="cerrarImagenAmpliada">
      <div class="lightbox-content">
        <img :src="imagenAmpliada.url_imagen" :alt="imagenAmpliada.nombre_lugar" class="full-image" />
        <button @click="cerrarImagenAmpliada" class="close-lightbox">
          <span class="close-icon">❌</span> Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GaleriaView',
  data() {
    return {
      imagenes: [],
      imagenAmpliada: null
    };
  },
  methods: {
    async cargarImagenes() {
      try {
        const response = await axios.get('http://localhost:3000/api/galeria');
        this.imagenes = response.data;
      } catch (error) {
        console.error('Error al cargar las imágenes de la galería:', error);
        // Puedes agregar aquí lógica para mostrar un mensaje de error al usuario
      }
    },
    mostrarImagenAmpliada(imagen) {
      this.imagenAmpliada = imagen;
    },
    cerrarImagenAmpliada() {
      this.imagenAmpliada = null;
    }
  },
  mounted() {
    this.cargarImagenes();
  }
};
</script>

<style scoped>
.gallery-page {
  padding: 40px;
  background: linear-gradient(to bottom, #f4f4f4, #ffffff);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
}

h1 {
  color: #333;
  font-size: 2.5em;
  margin-bottom: 30px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
  padding: 20px;
}

.image-item {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease-in-out;
}

.image-item:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.image-wrapper {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity 0.3s ease-in-out;
}

.image-item:hover .thumbnail {
  opacity: 0.9;
}

.location-name {
  padding: 15px;
  background-color: white;
  color: #555;
  font-size: 0.9em;
  text-align: center;
  border-radius: 0 0 8px 8px;
}

/* Lightbox Styles */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
}

.lightbox-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  position: relative;
  max-width: 95vw;
  max-height: 95vh;
  overflow: auto;
  cursor: auto; /* Restore default cursor for content */
}

.full-image {
  display: block;
  max-width: 90vw;
  max-height: 80vh;
  border-radius: 5px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.close-lightbox {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
  z-index: 1001;
}

.close-lightbox:hover {
  background-color: #555;
}

.close-icon {
  margin-right: 5px;
}
</style>