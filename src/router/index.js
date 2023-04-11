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
        component: () => import('@/views/SearchPage.vue')
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
  }
  
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
