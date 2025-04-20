<template>
    <div class="tour-card">
      <img :src="require(`@/assets/${tour.imagen}`)" :alt="tour.titulo" class="tour-image" />
      <h3>{{ tour.titulo }}</h3>
      <span class="location">{{ tour.ubicacion }}</span>
      <div class="price">$ {{ tour.precio.toLocaleString("es-CO") }}</div>
      <button @click="openModal" class="detail-btn">Ver Detalle</button>
      <p class="description">{{ tour.descripcion }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "TourCard",
    props: {
      tour: Object
    },
    methods: {
      openModal() {
        this.$emit("open-modal", this.tour);
      }
    }
  };
  </script>
  
  <style scoped>
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
  </style>
  