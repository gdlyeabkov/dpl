import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Playground from '../views/Playground.vue'
import Blog from '../views/Blog.vue'
import WhyLang from '../views/WhyLang.vue'
import Docs from '../views/Docs.vue'
import GetStarted from '../views/GetStarted.vue'
import Packages from '../views/Packages.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/playground',
    name: 'Playground',
    component: Playground
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/docs',
    name: 'Docs',
    component: Docs
  },
  {
    path: '/getstarted',
    name: 'GetStarted',
    component: GetStarted
  },
  {
    path: '/packages',
    name: 'Packages',
    component: Packages
  },
  {
    path: '/why',
    name: 'WhyLang',
    component: WhyLang
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
