<template>
  <div class="actividad-card">
    <img :src="actividad.imagen" :alt="actividad.nombre">
    <h3>{{ actividad.nombre }}</h3>
    <p>{{ actividad.descripcion }}</p>
    <div v-if="actividad.precio" class="precio">$ {{ formatearPrecio(actividad.precio) }}</div>
    <button @click="verDetalle(actividad.id)">Ver Detalles</button>
    <button
      class="comprar-btn"
      :class="{ 'no-disponible': !actividad.precio }"
      @click="comprarActividad(actividad)"
      :disabled="!actividad.precio"
    >
      {{ actividad.precio ? 'Comprar' : 'No Disponible' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ActividadCard',
  props: {
    actividad: {
      type: Object,
      required: true
    }
  },
  methods: {
    verDetalle(id) {
      this.$emit('ver-detalle', id);
    },
    comprarActividad(actividad) {
      if (actividad.precio) {
        this.$emit('comprar-actividad', actividad);
      } else {
        alert('Esta actividad no está disponible.');
      }
    },
    formatearPrecio(precio) {
      if (typeof precio === 'number') {
        return precio.toLocaleString('es-CO');
      }
      return precio;
    }
  }
};
</script>

<style scoped>
.actividad-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.actividad-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.actividad-card h3 {
  margin: 10px 0;
  padding: 0 10px;
}

.actividad-card p {
  padding: 0 15px;
  margin-bottom: 10px;
  font-size: 0.9em;
  color: #555;
}

.actividad-card .precio {
  font-weight: bold;
  font-size: 1.1em;
  color: green;
  margin-bottom: 5px;
}

.actividad-card button {
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
}

.actividad-card .comprar-btn {
  background-color: #28a745;
}

.actividad-card .comprar-btn:hover {
  background-color: #1e7e34;
}

.actividad-card .comprar-btn.no-disponible {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}
</style>