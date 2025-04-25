<template>
  <div class="activities-page">
    <h1>Explora Nuestras Actividades</h1>

    <div v-if="error" class="error-state">
      <p>
        <span class="error-icon">⚠️</span> Error al cargar las actividades: {{ error }}
      </p>
    </div>
    <div v-else class="activities-grid">
      <div v-for="actividad in actividades" :key="actividad.id" class="activity-card">
        <div class="image-container">
          <img :src="actividad.imagen" :alt="actividad.nombre" class="activity-image" />
        </div>
        <div class="activity-info">
          <h3>{{ actividad.nombre }}</h3>
          <p class="description">{{ actividad.descripcion }}</p>
          <div v-if="actividad.precio" class="price">
            $ {{ formatearPrecio(actividad.precio) }}
          </div>
          <div class="actions">
            <button @click="openModal(actividad)" class="detail-button">
              <span class="info-icon">ℹ️</span> Ver Detalles
            </button>
            <button
              class="buy-button"
              :class="{ 'disabled': !actividad.precio }"
              @click="iniciarCompra(actividad)"
              :disabled="!actividad.precio"
            >
              <span v-if="actividad.precio" class="cart-icon">🛒</span>
              {{ actividad.precio ? 'Comprar' : 'No Disponible' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>{{ selectedActividad.nombre }}</h2>
        <img
          v-if="selectedActividad.imagen"
          :src="selectedActividad.imagen"
          :alt="selectedActividad.nombre"
          class="modal-image"
        />
        <p>{{ selectedActividad.descripcion }}</p>
        <button @click="closeModal" class="close-button">
          <span class="close-icon">❌</span> Cerrar
        </button>
      </div>
    </div>

    <div v-if="mostrandoBanco" class="modal">
      <div class="modal-content bank-modal">
        <h2><span class="bank-icon">🏦</span> Banco JAIR</h2>
        <p class="buying-info">
          Seleccione su banco para la actividad:
          <strong v-if="actividadComprada">{{ actividadComprada.nombre }}</strong>
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
          Disfrute de su actividad:
          <strong v-if="actividadComprada">{{ actividadComprada.nombre }}</strong>.
        </p>
        <button @click="compraExitosa = false" class="close-button">
          <span class="ok-icon">👍</span> Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ActividadesView",
  data() {
    return {
      actividades: [],
      showModal: false,
      selectedActividad: {},
      mostrandoBanco: false,
      bancoSeleccionado: '',
      numeroCuenta: '',
      actividadComprada: null,
      compraExitosa: false,
      error: null,
      bancosColombianos: [
        'Bancolombia',
        'Nequi',
        'Davivienda',
        'Daviplata',
        'Banco de Bogotá',
        'Banco Popular',
        'Banco AV Villas',
        'Banco Falabella',
        'Banco BBVA Colombia',
        'Scotiabank Colpatria',
        'Banco Itaú Colombia',
        'Banco Serfinanza'
      ]
    };
  },
  methods: {
    openModal(actividad) {
      this.selectedActividad = actividad;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async fetchActividades() {
      try {
        const response = await axios.get("http://localhost:3000/api/actividades");
        this.actividades = response.data;
      } catch (error) {
        console.error("Error al obtener las actividades:", error);
        this.error = "No se pudieron cargar las actividades. Por favor, intenta de nuevo más tarde.";
      }
    },
    formatearPrecio(precio) {
      if (typeof precio === 'number') {
        return precio.toLocaleString('es-CO');
      }
      return precio;
    },
    iniciarCompra(actividad) {
      if (actividad.precio) {
        this.actividadComprada = actividad;
        this.mostrandoBanco = true;
        this.bancoSeleccionado = '';
        this.numeroCuenta = '';
      } else {
        alert('Esta actividad no está disponible para comprar.');
      }
    },
    procesarCompra() {
      if (this.bancoSeleccionado && this.numeroCuenta.length >= 5 && this.actividadComprada) {
        this.mostrandoBanco = false;
        this.compraExitosa = true;
      } else if (!this.bancoSeleccionado) {
        alert('Por favor, seleccione un banco.');
      } else if (this.numeroCuenta.length < 5) {
        alert('Por favor, ingrese un número de cuenta válido (mínimo 5 dígitos).');
      }
    },
    cerrarBanco() {
      this.mostrandoBanco = false;
      this.actividadComprada = null;
      this.bancoSeleccionado = '';
      this.numeroCuenta = '';
    }
  },
  created() {
    this.fetchActividades();
  }
};
</script>

<style scoped>
.activities-page {
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

.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
}

.activity-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
}

.activity-card:hover {
  transform: translateY(-5px);
}

.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.activity-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.activity-info {
  padding: 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.activity-info h3 {
  color: #333;
  font-size: 1.5em;
  margin-top: 0;
  margin-bottom: 10px;
}

.activity-info .description {
  color: #555;
  font-size: 0.95em;
  line-height: 1.6;
  margin-bottom: 15px;
  flex-grow: 1;
}

.activity-info .price {
  font-weight: bold;
  color: #28a745;
  font-size: 1.1em;
  margin-bottom: 15px;
}

.activity-info .actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
}

.detail-button,
.buy-button {
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-button {
  background-color: #007bff;
}

.detail-button:hover {
  background-color: #0056b3;
}

.buy-button {
  background-color: #28a745;
}

.buy-button:hover {
  background-color: #1e7e34;
}

.buy-button.disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

.info-icon,
.cart-icon,
.check-icon,
.close-icon,
.success-icon,
.ok-icon,
.bank-icon,
.error-icon {
  margin-right: 5px;
}

/* Estilos para el modal (general) */
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

.modal-content h2 {
  color: #333;
  font-size: 2em;
  margin-bottom: 20px;
}

.modal-image {
  width: 60%;
  max-height: 300px;
  object-fit: contain;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.modal-content .close-button {
  background-color: #6c757d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.modal-content .close-button:hover {
  background-color: #545b62;
}

/* Estilos específicos del modal de banco */
.bank-modal h2 {
  color: #007bff;
}

.bank-modal .buying-info {
  color: #555;
  margin-bottom: 20px;
}

.bank-modal .input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  text-align: left;
}

.bank-modal .input-group label {
  color: #333;
  margin-bottom: 5px;
  font-weight: bold;
}

.bank-modal .input-group select,
.bank-modal .input-group input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1em;
}

.bank-modal .modal-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.bank-modal .confirm-button,
.bank-modal .cancel-button {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
  color: white;
}

.bank-modal .confirm-button {
  background-color: #28a745;
}

.bank-modal .confirm-button:hover {
  background-color: #1e7e34;
}

.bank-modal .cancel-button {
  background-color: #dc3545;
}

.bank-modal .cancel-button:hover {
  background-color: #c82333;
}

/* Estilos específicos del modal de éxito */
.success-modal h2 {
  color: #28a745;
}

.success-modal p {
  font-size: 1.1em;
  color: #333;
  margin-bottom: 20px;
}

.success-modal .close-button {
  background-color: #007bff;
}

.success-modal .close-button:hover {
  background-color: #0056b3;
}

/* Estilo para el mensaje de error */
.error-state {
  padding: 20px;
  background-color: #ffebee;
  color: #d32f2f;
  border-radius: 8px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.error-state .error-icon {
  font-size: 1.5em;
  margin-right: 10px;
}
</style>