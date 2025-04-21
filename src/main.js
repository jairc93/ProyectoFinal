import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";

// Crear la aplicación Vue
const app = createApp(App);

// Usar Vue Router y Vue Axios
app.use(router);
app.use(VueAxios, axios);

// Montar la aplicación en el DOM
app.mount("#app");

export { app };
