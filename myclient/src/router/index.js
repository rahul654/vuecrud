import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'
import NewPost from '../components/NewPost.vue'
import UpdatePost from '../components/UpdatePost.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/newpost',
    name: 'newpost',
    component: NewPost
  },
  {
    path: '/updatepost/:id',
    name: 'updatepost',
    component: UpdatePost
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
