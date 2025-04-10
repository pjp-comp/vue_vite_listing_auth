import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import ProductList from '../pages/ProductList.vue'
import ProductDetail from '../pages/ProductDetail.vue'
import Logout from '../pages/Logout.vue'

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/logout', name: 'Logout', component: Logout },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductList,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 🔒 Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const tokenExpiry = localStorage.getItem('tokenExpiry')

  // Check if the token is expired
  if (token && tokenExpiry && Date.now() > tokenExpiry) {
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiry')
    return next({ path: '/' }) // Redirect to login if token is expired
  }

  // If route requires auth and no token, redirect to login
  if (to.meta.requiresAuth && !token) {
    return next({ path: '/' })
  }

  // If logged in and trying to go to login page, redirect to /products
  if (token && to.path === '/') {
    return next({ path: '/products' })
  }

  next()
})

export default router
