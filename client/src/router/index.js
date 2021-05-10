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
    component: () => import('../views/NewGame.vue')
  },
  {
    path: '/waiting_room/:roomId',
    name: 'WaitingRoom',
    component: () => import('../views/WaitingRoom.vue')
  },
  {
    path: '/slides/:roomId',
    name: 'Slides',
    component: () => import('../views/Slides.vue')
  },
  {
    path: '/game_instructions/:roomId',
    name: 'GameInstructions',
    component: () => import('../views/GameInstructions.vue')
  },
  {
    path: '/game_groups/:roomId',
    name: 'GameGroups',
    component: () => import('../views/GameGroups.vue')
  },
  {
    path: '/group_info/:roomId/:groupId',
    name: 'GroupInfo',
    component: () => import('../views/GroupInfo.vue')
  },
  {
    path: '/mod_group_wait/:roomId',
    name: 'ModGroupWait',
    component: () => import('../views/ModGroupWait.vue')
  },
  {
    path: '/groups/individual_solution/:roomId/:groupId',
    name: 'IndividualSolution',
    component: () => import('../views/IndividualSolution.vue')
  },
  {
    path: '/groups/group_voting/:roomId/:groupId',
    name: 'GroupVoting',
    component: () => import('../views/GroupVoting.vue')
  },
  {
    path: '/groups/group_discussion/:roomId/:groupId',
    name: 'GroupDiscussion',
    component: () => import('../views/GroupDiscussion.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
