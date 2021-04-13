import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new_game',
    name: 'NewGame',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewGame.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
