import { createRouter, createWebHistory } from 'vue-router';
import TourView from '../views/TourView.vue';
import SobreNosotrosView from '../views/SobreNosotros.vue';
import ContactoView from '../views/ContactoView.vue';
import DestinosPopularesView from '../views/DestinosPopularesView.vue';
import ActividadesView from '../views/ActividadesView.vue';
import GaleriaView from '../views/GaleriaView.vue';

const routes = [
  { path: '/tours', name: 'Tours', component: TourView },
  { path: '/sobre-nosotros', name: 'SobreNosotros', component: SobreNosotrosView },
  { path: '/contacto', name: 'Contacto', component: ContactoView },
  { path: '/destinos-populares', name: 'DestinosPopulares', component: DestinosPopularesView },
  { path: '/actividades', name: 'Actividades', component: ActividadesView },
  { path: '/galeria', name: 'Galeria', component: GaleriaView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;