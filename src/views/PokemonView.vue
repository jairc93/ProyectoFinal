<template>
  <div class="pokemon-container">
    <PokemonComponent
      v-for="pokemon in pokemones"
      :key="pokemon.id"
      :id="pokemon.id"
      :imagen="pokemon.sprites.other['official-artwork'].front_default"
      :nombre="capitalize(pokemon.name)"
      :tipo="capitalize(pokemon.types[0].type.name)"
      :color="getColor(pokemon.types[0].type.name)"
    />
  </div>
</template>

<script>
import PokemonComponent from "@/components/PokemonComponent.vue";
import axios from "axios";

export default {
  name: "PokemonView",
  components: {
    PokemonComponent,
  },
  data() {
    return {
      pokemones: [],
      idsDeseados: [1, 4, 7, 10, 25, 37, 47, 48, 50, 64, 76, 73, 105, 95, 94, 81, 150],
    };
  },
  async created() {
    try {
      const pokemonDetails = await Promise.all(
        this.idsDeseados.map(id => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.data))
      );
      this.pokemones = pokemonDetails;
    } catch (error) {
      console.error("Error al obtener los Pokémon:", error);
    }
  },
  methods: {
    getColor(tipo) {
      const colores = {
        grass: "#78C850",
        fire: "#F08030",
        water: "#6890F0",
        bug: "#A8B820",
        normal: "#A8A878",
        poison: "#A040A0",
        electric: "#F8D030",
        ground: "#E0C068",
        fairy: "#EE99AC",
        fighting: "#C03028",
        psychic: "#F85888",
        rock: "#B8A038",
        ghost: "#705898",
        ice: "#98D8D8",
        dragon: "#7038F8",
        dark: "#705848",
        steel: "#B8B8D0",
        flying: "#A890F0",
      };
      return colores[tipo] || "#A8A878";
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
};
</script>

<style scoped>
.pokemon-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  padding: 20px;
  justify-content: center;
  align-items: center;
}
</style>