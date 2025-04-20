<template>
  <div class="card">
    <img class="imagen-pokemon" :src="imagen" alt="Imagen de Pokémon">
    <h3 class="titulo-pokemon">{{ nombre }}</h3>
    <span :style="{ 'background-color': color }" class="tipo-pokemon">{{ tipo }}</span>
    <button class="ver-detalle" @click="mostrarAlerta">Ver Detalle</button>
  </div>
</template>

<script>
export default {
  name: "PokemonComponent",
  props: {
    id: Number,
    imagen: String,
    nombre: String,
    tipo: String,
    color: String
  },
  methods: {
    mostrarAlerta() {
      alert(`Seleccionaste a ${this.nombre}, que es de tipo ${this.tipo}`);
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.card {
  display: flex;
  flex-direction: column;
  height: 350px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.imagen-pokemon {
  width: 100%;
  height: auto;
}

.titulo-pokemon {
  font-size: 1.2rem;
  font-weight: bold;
}

.tipo-pokemon {
  padding: 5px 10px;
  color: white;
  border-radius: 5px;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.ver-detalle {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.ver-detalle:hover {
  background-color: #0056b3;
}
</style>
