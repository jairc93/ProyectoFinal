import { createRouter, createWebHistory } from 'vue-router';
import TourView from '../views/TourView.vue';
import SobreNosotros from '../views/SobreNosotros.vue';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView, // Vista de inicio
  },
  {
    path: '/tours',
    name: 'tours',
    component: TourView, // Vista de los tours
  },
  {
    path: '/sobre-nosotros',
    name: 'sobre-nosotros',
    component: SobreNosotros, // Vista "Sobre Nosotros"
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes, // Rutas definidas anteriormente
});

export default router;
