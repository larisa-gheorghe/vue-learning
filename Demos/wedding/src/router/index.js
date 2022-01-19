import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Info from '@/views/WeddingDayInfo.vue';
import SeatingArrangements from '@/views/SeatingArrangements.vue';
import GuestList from '@/views/GuestList.vue';
import Manage from '@/views/Manage.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/info',
    component: Info,
  },
  {
    path: '/seating-arrangements',
    component: SeatingArrangements,
  },
  {
    path: '/guest-list',
    component: GuestList,
  },
  {
    path: '/manage',
    component: Manage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
