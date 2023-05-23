import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FoodsView from '../views/FoodsView.vue'
import FoodDetailView from '../views/FoodDetailView.vue'
import KeranjangView from '../views/KeranjangView.vue'
import PesananSukses from '../views/PesananSukses.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/foods',
    name: 'foods',
    component: FoodsView 
  },
  {
    path: '/foods/:id',
    name: 'FoodDetail',
    component: FoodDetailView 
  },
  {
    path: '/keranjang',
    name: 'keranjang',
    component: KeranjangView 
  },
  {
    path: '/pesanan-sukses',
    name: 'PesananSukses',
    component: PesananSukses 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
