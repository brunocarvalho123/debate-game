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
  },
  {
    path: '/waiting_room/:roomId',
    name: 'WaitingRoom',
    component: () => import(/* webpackChunkName: "about" */ '../views/WaitingRoom.vue')
  },
  {
    path: '/slides/:roomId',
    name: 'Slides',
    component: () => import(/* webpackChunkName: "about" */ '../views/Slides.vue')
  },
  {
    path: '/game_instructions/:roomId',
    name: 'GameInstructions',
    component: () => import(/* webpackChunkName: "about" */ '../views/GameInstructions.vue')
  },
  {
    path: '/game_groups/:roomId',
    name: 'GameGroups',
    component: () => import(/* webpackChunkName: "about" */ '../views/GameGroups.vue')
  },
  {
    path: '/group_info/:roomId/:groupId',
    name: 'GroupInfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/GroupInfo.vue')
  },
  {
    path: '/groups/individual_solution',
    name: 'IndividualSolution',
    component: () => import(/* webpackChunkName: "about" */ '../views/IndividualSolution.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
