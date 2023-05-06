import { createRouter, createWebHistory } from '@ionic/vue-router';
// import TabsPage from '../views/TabsPage.vue'
import StoreLayout from '../layout/StoreLayout.vue'
// import DeliveryLayout from '../layout/StoreLayout.vue'

const routes = [
  {
    path: '/',
    redirect: '/start'
  },
  {
    path: '/start',
    name:'Start',
    component: () => import('@/views/GetStarted.vue')

  },
  //// Store Routes
  {
    path: '/store',
    component: StoreLayout,
    children: [
      {
        path: '',
        name:'Store',
        component: () => import('@/views/Store/StorePage.vue')
      },
      {
        path: '/store/:id',
        name:'ViewStore',
        component: () => import('@/views/Store/ViewStore.vue')
      },
      {
        path: '/search',
        name:'Search',
        component: () => import('@/views/Search/SearchPage.vue')
      },
      {
        path: '/orders',
        name:'Orders',
        component: () => import('@/views/Orders/OrdersPage.vue')
      },
      {
        path: '/profile',
        name:'Profile',
        component: () => import('@/views/Profile/ProfilePage.vue')
      }
    ]
  },
  {
    path: '/profile/:id',
    name:'ViewPage',
    component: () => import('@/views/Profile/ViewPage.vue'),
  },
  {
    path: '/faq',
    name:'FAQ',
    component: () => import('@/views/Help/FaqPage.vue'),
  },
  {
    path: '/help',
    name:'Help',
    component: () => import('@/views/Help/SupportPage.vue'),
  },

  // Package Deliver Routes
  {
    path: '/delivery',
    name:'Delivery',
    component: () => import('@/views/Delivery/DeliveryPage.vue'),

  },
  {
    path: '/package/:id',
    name:'ViewPackage',
    component: () => import('@/views/Delivery/ViewPackage.vue')
  },
  {
    path: '/create-order',
    name:'CreateOrder',
    component: () => import('@/views/Delivery/CreateOrder.vue')
  },

  // Authentication Routes
  {
    path: '/auth/login',
    name:'Login',
    component: () => import('@/views/auth/LoginPage.vue')
  },
  {
    path: '/auth/password',
    name:'ForgotPassword',
    component: () => import('@/views/auth/ForgotPassword.vue')
  },
  {
    path: '/auth/register',
    name:'Register',
    component: () => import('@/views/auth/RegisterPage.vue')
  }
  
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
