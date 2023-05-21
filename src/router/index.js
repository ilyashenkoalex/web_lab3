import { createRouter, createWebHistory } from 'vue-router';
import SicksView from '../views/SicksView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: SicksView,
  },
  {
    path: '/doctors',
    name: 'Doctors',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DoctorsView.vue'),
  },
  {
    path: '/sicks-edit/:id?',
    name: 'SicksEdit',
    props: (route) => {
      return {
        id: route.params.id,
      };
    },
    component: () => import('../views/SicksEdit.vue'),
  },
  {
    path: '/doctors-edit/:id?',
    name: 'DoctorsEdit',
    props: (route) => {
      return {
        id: route.params.id,
      };
    },
    component: () => import('../views/DoctorsEdit.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
