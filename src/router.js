import Vue from 'vue'
import VueRouter from 'vue-router'
import Formulario from './components/Formulario.vue'
import Usuarios from './components/Usuarios.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/formulario' },
    { path: '/usuarios', component: Usuarios },
    { path: '/formulario', component: Formulario }
  ]
})
