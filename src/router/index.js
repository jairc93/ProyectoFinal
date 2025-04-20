import { createRouter, createWebHistory } from 'vue-router';
import TourView from '../views/TourView.vue';
import SobreNosotros from '../views/SobreNosotros.vue';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/tours',
    name: 'tours',
    component: TourView,
  },
  {
    path: '/sobre-nosotros',
    name: 'sobre-nosotros',
    component: SobreNosotros,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
