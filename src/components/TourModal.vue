<template>
    <div class="modal">
      <div class="modal-content">
        <h2>{{ tour.nombre }}</h2>
        <img :src="tour.imagen" :alt="tour.nombre" class="modal-image" />
        <p>{{ tour.descripcion }}</p>
        <span class="location">{{ tour.ubicacion }}</span>
        <button @click="closeModal" class="close-btn">Cerrar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      tour: Object, // Propiedad que recibe el tour para mostrar en el modal
    },
    methods: {
      closeModal() {
        this.$emit('close'); // Emitir el evento 'close' al componente padre
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    max-width: 600px;
    text-align: center;
  }
  
  .modal-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 10px;
  }
  
  .close-btn {
    background-color: #dc3545;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }
  
  .close-btn:hover {
    background-color: #c82333;
  }
  </style>
  