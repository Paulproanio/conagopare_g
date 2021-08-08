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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue')
  },
  {
    path: '/cementerio',
    name: 'Cementerio',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cementerio.vue')
  },
  {
    path: '/tipousuario',
    name: 'Tipousuario',
    component: () => import(/* webpackChunkName: "about" */ '../views/Tipousuario.vue')
  },
  {
    path: '/bloque',
    name: 'Bloque',
    component: () => import(/* webpackChunkName: "about" */ '../views/Bloque.vue')
  },
  {
    path: '/listarbloque',
    name: 'Listarbloque',
    component: () => import(/* webpackChunkName: "about" */ '../views/Listarbloque.vue')
  }
  ,
  {
    path: '/nicho',
    name: 'Nicho',
    component: () => import(/* webpackChunkName: "about" */ '../views/Nicho.vue')
  },
  {
    path: '/tiponicho',
    name: 'Tiponicho',
    component: () => import(/* webpackChunkName: "about" */ '../views/Tiponicho.vue')
  },
  {
    path: '/estadonicho',
    name: 'Estadonicho',
    component: () => import(/* webpackChunkName: "about" */ '../views/Estadonicho.vue')
  },
  {
    path: '/listartipoyestadonicho',
    name: 'Listartipoyestadonicho',
    component: () => import(/* webpackChunkName: "about" */ '../views/Listartipoyestadonicho.vue')
  },
  {
    path: '/listarcementerio',
    name: 'Listarcementerio',
    component: () => import(/* webpackChunkName: "about" */ '../views/Listarcementerio.vue')
  },
  {
    path: '/representante',
    name: 'Representante',
    component: () => import(/* webpackChunkName: "about" */ '../views/Representante.vue')
  } ,
  {
    path: '/asignar',
    name: 'Asignar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Asignar.vue')
  } ,
  {
    path: '/listarnicho',
    name: 'Listarnicho',
    component: () => import(/* webpackChunkName: "about" */ '../views/Listarnicho.vue')
  },
  {
    path: '/listarepresentantes',
    name: 'Listarepresentantes',
    component: () => import(/* webpackChunkName: "about" */ '../views/Listarepresentantes.vue')
  },
  {
    path: '/listarfallecimientos',
    name: 'Listarfallecimientos',
    component: () => import(/* webpackChunkName: "about" */ '../views/Listarfallecimientos.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
