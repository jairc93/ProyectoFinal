<template>
  <div class="imagen-galeria">
    <img :src="imagen.url_imagen" :alt="imagen.nombre_lugar" class="imagen-miniatura" @click="$emit('click')">
    <p class="nombre-lugar">{{ imagen.nombre_lugar }}</p>
  </div>
</template>

<script>
export default {
  name: 'GaleriaImagen',
  props: {
    imagen: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.imagen-galeria {
  margin-bottom: 15px;
  cursor: pointer;
  text-align: center;
}

.imagen-miniatura {
  width: 100%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.imagen-miniatura:hover {
  transform: scale(1.05);
}

.nombre-lugar {
  margin-top: 5px;
  font-size: 0.9em;
  color: #555;
}
</style>