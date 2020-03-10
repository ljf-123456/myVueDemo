import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import Home from '../components/lHome'
import Login from '../components/lLogin'


import GoodsMsg from '../components/GoodsMsg'
import ServerP from '../components/ServerP.vue'
import web from '../components/WebSocketTest.vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
const routes = [{
    path: '/',
    component: Login,
    redirect: '/login'
  },
  {
    path: '/home',
    component: Home,
    children: [{
        path: 'GoodsMsg',
        name: 'GoodsMsg',
        component: GoodsMsg
      },
      {
        path: 'ServerP',
        name: 'ServerP',
        component: ServerP
      }
    ]
  },
  {
   path: '/login',
   component: Login
  },
  {
    path: '/web',
    component: web
  }

]
const router = new VueRouter({
  mode:'hash',
  routes
})
export default router
