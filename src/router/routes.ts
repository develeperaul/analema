import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/NoHeadLayout.vue'),
    children: [
      {
        path: 'online-scene',
        name: 'online-scene',
        component: () => import('pages/OnlineScene.vue'),
      },
      {
        path: 'rezult-scene',
        name: 'rezult-scene',
        component: () => import('pages/RezultScene.vue'),
      },
      {
        path: 'my-sales',
        name: 'my-sales',
        component: () => import('pages/MySales.vue'),
      },
      {
        path: 'my-purchases',
        name: 'my-purchases',
        component: () => import('pages/MyPurchases.vue'),
      },
      // {
      //   path: 'catalog',
      //   name: 'catalog',
      //   component: () => import('pages/Catalog.vue'),
      // },
      // {
      //   path: 'catalog:id',
      //   name: 'catalog-item',
      //   component: () => import('pages/Tovar.vue'),
      // },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
