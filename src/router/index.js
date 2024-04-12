import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import BookDetails from '../views/BookDetails.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/book/:id',
    name: 'BookDetails',
    component: BookDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
