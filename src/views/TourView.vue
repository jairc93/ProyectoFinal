<template>
  <div class="container">
    <img src="/assets/banner.png" alt="Banner Principal" class="main-banner" />

    <input v-model="searchQuery" placeholder="Buscar sitio..." class="search-bar" />

    <div class="tour-container">
      <div v-for="tour in filteredTours" :key="tour.id" class="tour-card">
        <img :src="tour.imagen" :alt="tour.titulo" class="tour-image" />
        <h3>{{ tour.titulo }}</h3>
        <span class="location">{{ tour.ubicacion }}</span>
        <div class="price">$ {{ tour.precio.toLocaleString("es-CO") }}</div>
        <button @click="openModal(tour)" class="detail-btn">Ver Detalle</button>
        <button @click="iniciarCompra(tour)" class="comprar-btn">Comprar</button>
        <p class="description">{{ tour.descripcion }}</p>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>{{ selectedTour.titulo }}</h2>
        <img v-if="selectedTour.imagen" :src="selectedTour.imagen" :alt="selectedTour.titulo" class="modal-image" />
        <p>{{ selectedTour.descripcion_completa }}</p>
        <button @click="closeModal">Cerrar</button>
      </div>
    </div>

    <div v-if="mostrandoBanco" class="modal">
      <div class="modal-content bank-modal">
        <h2><span class="bank-icon">🏦</span> Banco JAIR</h2>
        <p class="buying-info">
          Está comprando el tour:
          <strong v-if="tourAComprar">{{ tourAComprar.titulo }}</strong>
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

    <div v-if="compraExitosa" class="mensaje-exito">
      ¡Compra Exitosa! Disfrute de su tour: {{ tourComprado ? tourComprado.titulo : '' }}.
      <button @click="compraExitosa = false">Cerrar</button>
    </div>

    <section class="about-us">
      <h2>Sobre Nosotros</h2>
      <p>Somos una agencia de viajes dedicada a ofrecer experiencias inolvidables en Santa Marta.</p>
      <router-link to="/sobre-nosotros">
        <button class="about-us-btn">¿Quieres saber más sobre nosotros?</button>
      </router-link>
    </section>

    <footer>
      <div class="footer-content">
        <div class="footer-section">
          <h3>Navegación</h3>
          <ul>
            <li><router-link to="/contacto">Contacto</router-link></li>
            <li><router-link to="/destinos-populares">Destinos Populares</router-link></li>
            <li><router-link to="/actividades">Actividades</router-link></li>
            <li><router-link to="/galeria">Galería</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Información de Contacto</h3>
          <p><strong>Dirección:</strong> Av. El Libertador #13-45, Comuna 4, Santa Marta, Magdalena</p>
          <p><strong>Teléfono:</strong> +57 3024902423</p>
          <p><strong>Email:</strong> ritmocaribetours@colombia.gov.co</p>
        </div>
        <div class="footer-section">
          <h3>Síguenos</h3>
          <div class="social-icons">
            <a href="https://www.facebook.com/jair.corvacho.33/?locale=es_LA" target="_blank" class="icon">
              <img src="/assets/facebook.png" alt="Facebook">
            </a>
            <a href="https://www.instagram.com/jayir_27/" target="_blank" class="icon">
              <img src="/assets/instagram.png" alt="Instagram">
            </a>
            <a href="https://x.com/corvacho_jair93" target="_blank" class="icon">
              <img src="/assets/x.png" alt="Twitter">
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 Santa Marta Travels. Todos los derechos reservados.</p>
        <p>Este es un sitio web verificado por el profe.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TourView",
  data() {
    return {
      searchQuery: "",
      showModal: false,
      selectedTour: {},
      tours: [],
      mostrandoBanco: false,
      bancoSeleccionado: "",
      numeroCuenta: "",
      tourAComprar: null,
      tourComprado: null,
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
    },
    iniciarCompra(tour) {
      this.tourAComprar = tour;
      this.mostrandoBanco = true;
      this.bancoSeleccionado = "";
      this.numeroCuenta = "";
    },
    procesarCompra() {
      if (this.bancoSeleccionado && this.numeroCuenta.length >= 5 && this.tourAComprar) {
        this.mostrandoBanco = false;
        this.compraExitosa = true;
        this.tourComprado = this.tourAComprar;
        // Aquí podrías implementar la lógica real de compra (enviar datos al servidor, etc.)
        console.log("Compra procesada para:", this.tourAComprar, "con banco:", this.bancoSeleccionado, "y cuenta:", this.numeroCuenta);
      } else if (!this.bancoSeleccionado) {
        alert("Por favor, seleccione un banco.");
      } else if (this.numeroCuenta.length < 5) {
        alert("Por favor, ingrese un número de cuenta válido (mínimo 5 dígitos).");
      } else if (!this.tourAComprar) {
        alert("No se ha seleccionado ningún tour para comprar.");
      }
    },
    cerrarBanco() {
      this.mostrandoBanco = false;
      this.tourAComprar = null;
      this.bancoSeleccionado = "";
      this.numeroCuenta = "";
    },
  },
  created() {
    this.fetchTours();
  }
};
</script>

<style scoped>
/* Estilos Generales */
.container {
  text-align: center;
  padding: 40px;
  background: linear-gradient(to bottom, #f4f4f4, #ffffff);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.main-banner {
  width: 45%;
  height: auto;
  border-radius: 12px;
  margin-bottom: 30px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.search-bar {
  padding: 12px 20px;
  width: 60%;
  margin-bottom: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.search-bar:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 2px 5px rgba(0, 123, 255, 0.2);
}

/* Contenedor de Tours */
.tour-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
}

/* Tarjeta de Tour */
.tour-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.tour-card:hover {
  transform: translateY(-5px);
}

.tour-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.tour-card > * {
  padding: 15px;
}

.tour-card h3 {
  margin-top: 10px;
  color: #333;
  font-size: 1.5em;
  margin-bottom: 8px;
}

.location {
  font-size: 0.95em;
  color: #777;
  margin-bottom: 10px;
  display: block;
}

.price {
  font-weight: 600;
  color: #28a745;
  margin-bottom: 15px;
  font-size: 1.2em;
}

.detail-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  align-self: center;
  margin-bottom: 5px;
}

.detail-btn:hover {
  background-color: #0056b3;
}

.comprar-btn {
  background-color: #28a745; /* Color verde para el botón Comprar */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
  margin-top: 5px;
  align-self: center;
  margin-bottom: 15px;
}

.comprar-btn:hover {
  background-color: #1e7e34;
}

.description {
  color: #555;
  font-size: 0.9em;
  line-height: 1.5;
}

/* Modal de Detalle */
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
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
}

.modal-content h2 {
  color: #333;
  font-size: 2em;
  margin-bottom: 15px;
}

.modal-image {
  width: 60%;
  max-height: 300px;
  object-fit: contain;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.modal-content p {
  color: #555;
  font-size: 1em;
  line-height: 1.7;
  margin-bottom: 20px;
  text-align: left;
}

.modal-content button {
  background-color: #6c757d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.modal-content button:hover {
  background-color: #545b62;
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

/* Mensaje de Éxito */
.mensaje-exito {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  background-color: #d4edda;
  color: #155724;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  z-index: 102; /* Asegura que esté por encima de los otros modales */
  text-align: center;
}

.mensaje-exito button {
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.mensaje-exito button:hover {
  background-color: #1e7e34;
}

/* Sección Sobre Nosotros */
.about-us {
  margin-top: 50px;
  padding: 40px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  text-align: left;
}

.about-us h2 {
  color: #333;
  font-size: 1.8em;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.about-us p {
  line-height: 1.7;
  color: #666;
  font-size: 1em;
  margin-bottom: 25px;
}

.about-us-btn {
  background-color: #ff8c00;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  margin-top: 25px;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s ease;
}

.about-us-btn:hover {
  background-color: #e67700;
}

/* Estilos del Footer */
footer {
  background-color: #222;
  color: #eee;
  padding: 40px 20px;
  margin-top: 60px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 30px;
}

.footer-section {
  flex: 1 1 250px;
  margin-bottom: 30px;
  text-align: left;
}

.footer-section h3 {
  color: #fff;
  margin-bottom: 15px;
  border-bottom: 2px solid #444;
  padding-bottom: 8px;
  font-size: 1.2em;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section ul li a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95em;
}

.footer-section ul li a:hover {
  color: #fff;
}

.footer-section:first-child { /* Estilos para la sección de navegación */
  text-align: left;
}

.footer-section:first-child ul {
  text-align: left;
  display: block;
}

.footer-section p {
  line-height: 1.7;
  color: #ccc;
  font-size: 0.95em;
}

.footer-section:last-child { /* Estilos específicos para la sección "Síguenos" */
  text-align: left;
}

.social-icons {
  display: flex;
  gap: 15px;
  margin-top: 15px;
}

.social-icons a {
  display: inline-block;
}

.social-icons .icon {
  width: 35px;
  height: 35px;
}

.social-icons .icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.social-icons .icon img:hover {
  opacity: 1;
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid #444;
}

.footer-bottom p {
  font-size: 0.9em;
  color: #888;
  margin: 8px 0;
}
</style>