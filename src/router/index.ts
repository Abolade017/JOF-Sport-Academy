import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import Fixtures from '@/views/Fixtures.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import Teams from '@/views/Teams.vue'
import Phone from '@/views/phone.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/fixtures',
      name: 'fixtures',
      component: Fixtures,
    },
    {
      path: '/teams',
      name: 'teams',
      component: Teams
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView
    },
    {
      path: '/phone',
      name: 'phone',
      component: Phone
    }

  ],
})

export default router
