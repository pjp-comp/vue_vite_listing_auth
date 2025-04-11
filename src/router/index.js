import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import ProductList from '../pages/ProductList.vue'
import ProductDetail from '../pages/ProductDetail.vue'
import Logout from '../pages/Logout.vue'
import { isTokenExpired, refreshAccessToken } from '../api/axiosInstance';

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
router.beforeEach(async (to, from, next) => {
  let accessToken = localStorage.getItem('accessToken');

  if (accessToken && isTokenExpired(accessToken)) {
    try {
      accessToken = await refreshAccessToken();
    } catch (err) {
      console.error('Token refresh failed, redirecting to login');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return next({ path: '/' });
    }
  }

  // After refreshing (or if not expired)
  if (to.meta.requiresAuth && !accessToken) {
    return next({ path: '/' });
  }

  if (accessToken && to.path === '/') {
    return next({ path: '/products' });
  }

  next();
});


export default router
