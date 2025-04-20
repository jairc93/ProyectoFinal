<template>
  <div class="container">
    <input v-model="searchQuery" placeholder="Buscar sitio..." class="search-bar" />

    <div class="tour-container">
      <div v-for="tour in filteredTours" :key="tour.id" class="tour-card">
        <!-- Ahora las imágenes se cargan directamente desde /assets en la carpeta public -->
        <img :src="`/assets/${tour.imagen}`" :alt="tour.titulo" class="tour-image" />
        <h3>{{ tour.titulo }}</h3>
        <span class="location">{{ tour.ubicacion }}</span>
        <div class="price">$ {{ tour.precio.toLocaleString("es-CO") }}</div>
        <button @click="openModal(tour)" class="detail-btn">Ver Detalle</button>
        <p class="description">{{ tour.descripcion }}</p>
      </div>
    </div>

    <!-- Modal de detalles -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>{{ selectedTour.titulo }}</h2>
        <p>{{ selectedTour.descripcion_completa }}</p>
        <button @click="closeModal">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TourList",
  data() {
    return {
      searchQuery: "",
      showModal: false,
      selectedTour: {},
      tours: []
    };
  },
  computed: {
    filteredTours() {
      return this.tours.filter(tour =>
        tour.titulo.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    openModal(tour) {
      this.selectedTour = tour;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async fetchTours() {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/tours");
        this.tours = response.data;
      } catch (error) {
        console.error("Error al obtener los tours:", error);
      }
    }
  },
  created() {
    this.fetchTours();
  }
};
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
}
.search-bar {
  padding: 10px;
  width: 50%;
  margin-bottom: 20px;
}
.tour-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
.tour-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
  width: 250px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tour-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}
.location {
  font-size: 0.9em;
  color: #555;
}
.price {
  font-weight: bold;
  color: green;
  margin-top: 5px;
}
.detail-btn {
  background-color: green;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
}
</style>
