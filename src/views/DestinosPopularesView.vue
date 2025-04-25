<template>
  <div class="popular-destinations-page">
    <h1>Destinos Populares</h1>
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      Cargando destinos...
    </div>
    <div v-else-if="error" class="error-state">
      <p>
        <span class="error-icon">⚠️</span> Error al cargar los destinos: {{ error }}
      </p>
    </div>
    <div v-else-if="destinosPopulares.length === 0" class="empty-state">
      <p>
        <span class="empty-icon">😔</span> No hay destinos populares disponibles en este momento.
      </p>
    </div>
    <div v-else class="destinations-grid">
      <DestinoCard
        v-for="destino in destinosPopulares"
        :key="destino.id"
        :destino="destino"
        @comprar-destino="iniciarCompra"
        class="destination-card"
      />
    </div>

    <div v-if="mostrandoBanco" class="modal">
      <div class="modal-content bank-modal">
        <h2><span class="bank-icon">🏦</span> Banco JAIR</h2>
        <p class="buying-info">
          Está comprando el destino:
          <strong v-if="destinoComprado">{{ destinoComprado.nombre }}</strong>
        </p>
        <div class="input-group">
          <label for="banco">Seleccione su banco:</label>
          <select v-model="bancoSeleccionado" id="banco">
            <option value="" disabled>Seleccione un banco</option>
            <option v-for="banco in bancosColombianos" :key="banco" :value="banco">
              {{ banco }}
            </option>
          </select>
        </div>
        <div class="input-group">
          <label for="cuenta">Ingrese su número de cuenta:</label>
          <input
            type="text"
            v-model="numeroCuenta"
            placeholder="Número de Cuenta"
            id="cuenta"
          />
        </div>
        <div class="modal-actions">
          <button @click="procesarCompra" class="confirm-button">
            <span class="check-icon">✅</span> Comprar Ahora
          </button>
          <button @click="cerrarBanco" class="cancel-button">
            <span class="close-icon">❌</span> Cancelar
          </button>
        </div>
      </div>
    </div>

    <div v-if="compraExitosa" class="modal">
      <div class="modal-content success-modal">
        <h2><span class="success-icon">🎉</span> ¡Compra Exitosa!</h2>
        <p>
          Disfrute de su destino:
          <strong v-if="destinoComprado">{{ destinoComprado.nombre }}</strong>.
        </p>
        <button @click="compraExitosa = false" class="close-button">
          <span class="ok-icon">👍</span> Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DestinoCard from "@/components/DestinoCard.vue";
import axios from "axios";

export default {
  name: "DestinosPopularesView",
  components: {
    DestinoCard,
  },
  data() {
    return {
      destinosPopulares: [],
      loading: false,
      error: null,
      mostrandoBanco: false,
      bancoSeleccionado: "",
      numeroCuenta: "",
      destinoComprado: null,
      compraExitosa: false,
      bancosColombianos: [
        "Bancolombia",
        "Nequi",
        "Davivienda",
        "Daviplata",
        "Banco de Bogotá",
        "Banco Popular",
        "Banco AV Villas",
        "Banco Falabella",
        "Banco BBVA Colombia",
        "Scotiabank Colpatria",
        "Banco Itaú Colombia",
        "Banco Serfinanza",
      ],
    };
  },
  mounted() {
    this.fetchDestinosPopulares();
  },
  methods: {
    async fetchDestinosPopulares() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("http://localhost:3000/api/destinospopulares");
        if (response.status !== 200) {
          throw new Error(`Error al cargar destinos: ${response.status} - ${response.statusText}`);
        }
        this.destinosPopulares = response.data;
      } catch (err) {
        this.error = "Error de red: No se pudo conectar al servidor.";
        console.error("Error al cargar los destinos populares:", err);
      } finally {
        this.loading = false;
      }
    },
    iniciarCompra(destino) {
      this.destinoComprado = destino;
      this.mostrandoBanco = true;
      this.bancoSeleccionado = "";
      this.numeroCuenta = "";
    },
    procesarCompra() {
      if (this.bancoSeleccionado && this.numeroCuenta.length >= 5 && this.destinoComprado) {
        this.mostrandoBanco = false;
        this.compraExitosa = true;
      } else if (!this.bancoSeleccionado) {
        alert("Por favor, seleccione un banco.");
      } else if (this.numeroCuenta.length < 5) {
        alert("Por favor, ingrese un número de cuenta válido (mínimo 5 dígitos).");
      }
    },
    cerrarBanco() {
      this.mostrandoBanco = false;
      this.destinoComprado = null;
      this.bancoSeleccionado = "";
      this.numeroCuenta = "";
    },
  },
};
</script>

<style scoped>
.popular-destinations-page {
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

.loading-state,
.error-state,
.empty-state {
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 20px;
  color: #555;
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-state .spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #007bff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-state {
  background-color: #ffebee;
  color: #d32f2f;
}

.error-icon {
  font-size: 1.5em;
  margin-right: 10px;
}

.empty-state {
  background-color: #f0f4c3;
  color: #7cb342;
}

.empty-icon {
  font-size: 1.5em;
  margin-right: 10px;
}

.destinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
}

.destination-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
}

.destination-card:hover {
  transform: translateY(-5px);
}

/* Estilos para el modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
}

/* Estilos específicos del modal de banco */
.bank-modal h2 {
  color: #007bff;
  font-size: 2em;
  margin-bottom: 20px;
}

.bank-icon {
  font-size: 1.5em;
  margin-right: 10px;
}

.buying-info {
  color: #555;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  color: #333;
  margin-bottom: 5px;
  font-weight: bold;
}

.input-group select,
.input-group input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1em;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.confirm-button,
.cancel-button,
.close-button {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
  color: white;
}

.confirm-button {
  background-color: #28a745;
}

.confirm-button:hover {
  background-color: #1e7e34;
}

.cancel-button {
  background-color: #dc3545;
}

.cancel-button:hover {
  background-color: #c82333;
}

/* Estilos específicos del modal de éxito */
.success-modal h2 {
  color: #28a745;
  font-size: 2em;
  margin-bottom: 20px;
}

.success-icon {
  font-size: 1.5em;
  margin-right: 10px;
}

.close-button {
  background-color: #007bff;
}

.close-button:hover {
  background-color: #0056b3;
}

.ok-icon {
  font-size: 1.2em;
  margin-right: 5px;
}
</style>