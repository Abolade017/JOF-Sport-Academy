import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import Fixtures from '@/views/Fixtures.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import Teams from '@/views/Teams.vue'
import PlayerProfile from '@/views/PlayerProfile.vue'
import NewsView from '@/views/NewsView.vue'
import NewsDetails from '@/views/NewsDetails.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [

    { path: '/', name: 'home', component: HomeView },
    { path: '/news', name: 'news', component: NewsView },
    {
      path: '/news/:slug',
      name: 'news-details',
      component: NewsDetails,
      props: true, // VERY IMPORTANT
    },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/fixtures', name: 'fixtures', component: Fixtures },
    { path: '/teams', name: 'teams', component: Teams, meta: { breadcrumb: 'Players' } },
    {
      path: '/teams/:id', name: 'player-profile', component: PlayerProfile, props: true, meta: { breadcrumb: 'Profile' }
    },
    { path: '/registration', name: 'registration', component: RegistrationView },

  ],
})

export default router
