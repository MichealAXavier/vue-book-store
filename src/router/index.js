// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
//import BookDetails from '../components/BookDetails.vue';

const routes = [
  {
    path: '/:id?',
    name: 'Home',
    component: Home,
    props:true,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
