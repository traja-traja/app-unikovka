import { createRouter, createWebHashHistory } from 'vue-router'

import Index from '../pages/Index.vue'
import BestPlayers from '../pages/BestPlayers.vue'
import Game from '../pages/Game.vue'
import Login from '../pages/Login.vue'

import firebase from 'firebase'

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: Index
  },
  {
    path: '/game',
    name: 'Hraj únikovku',
    component: Game
  },
  {
    path: '/best-players',
    name: 'Nejlepší hráči',
    component: BestPlayers,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/login',
    name: 'Zadej heslo',
    component: Login
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (firebase.auth().currentUser) {
      next();
    } else {
      next({
        path: '/login',
      });
    }
  } else {
    next();
  }
});

export default router
