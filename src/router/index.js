import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'update',
    component: () => import(/* webpackChunkName: "about" */ '../views/page/update/update.vue')
    // component: Home
  },
  {
    path: '/update',
    name: 'Home',
    component: Home
  },
  {
    path: '/bookself',
    name: 'bookself',
    component: () => import(/* webpackChunkName: "bookself" */ '../views/page/bookself/bookself.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import(/* webpackChunkName: "mine" */ '../views/page/mine/mine.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import( '../views/page/search/search.vue'),
    children:[
      
    ]
  },
  {
    path: '/mangaDetail/:id',
    name: 'comicDetail',
    component: () => import( '../views/page/comicDetail/comicDetail')
  },

// ***********************************************************

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
