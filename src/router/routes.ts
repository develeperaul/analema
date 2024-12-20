import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/NoHeadLayout.vue"),
    children: [
      {
        path: "online-scene",
        name: "online-scene",
        component: () => import("pages/OnlineScene.vue"),
        meta: { auth: true },
      },
      {
        path: "rezult-scene",
        name: "rezult-scene",
        component: () => import("pages/RezultScene.vue"),
        meta: { parent: "online-scene", auth: true },
      },
      {
        path: "my-sales",
        name: "my-sales",
        component: () => import("pages/MySales.vue"),
        meta: { parent: "home", auth: true },
      },
      {
        path: "my-purchases",
        name: "my-purchases",
        component: () => import("pages/MyPurchases.vue"),
        meta: { parent: "home", auth: true },
      },
      {
        path: "catalog",
        name: "catalog",
        component: () => import("pages/Catalog.vue"),
        meta: { auth: true },
      },
      {
        path: "card/:id",
        name: "card",
        component: () => import("pages/Tovar.vue"),
        meta: { parent: "catalog", auth: true },
      },
      {
        path: "basket",
        name: "basket",
        component: () => import("pages/Basket.vue"),
        meta: { auth: true },
      },
      {
        path: "referals",
        name: "referals",
        component: () => import("pages/ReferalsPage.vue"),
        meta: { auth: true },
      },
      {
        path: "referals-list",
        name: "referals-list",
        component: () => import("pages/ReferalsListPage.vue"),
        meta: { parent: "referals", auth: true },
      },
      {
        path: "link",
        name: "link",
        component: () => import("pages/LinkPage.vue"),
        meta: { parent: "referals", auth: true },
      },
      {
        path: "ref-rules",
        name: "ref-rules",
        component: () => import("pages/RefRulesPage.vue"),
        meta: { parent: "referals", auth: true },
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("pages/ProfilePage.vue"),
        meta: { auth: true },
      },
      {
        path: "profile-data",
        name: "profile-data",
        component: () => import("pages/ProfileDataPage.vue"),
        meta: { parent: "profile", auth: true },
      },
      {
        path: "notification-settings",
        name: "notification-settings",
        component: () => import("pages/NotificationSettingsPage.vue"),
        meta: { parent: "profile", auth: true },
      },
      {
        path: "favorite",
        name: "favorite",
        component: () => import("pages/FavoritesPage.vue"),
        meta: { parent: "profile", auth: true },
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/ZeroLayout.vue"),
    children: [
      {
        path: "auth",
        name: "auth",
        component: () => import("pages/Auth/Index.vue"),
      },
      {
        path: "verify",
        name: "verify",
        component: () => import("pages/Auth/Verify.vue"),
      },
      {
        path: "data",
        name: "data",
        component: () => import("pages/Auth/Data.vue"),
      },
      {
        path: "first",
        name: "first",
        component: () => import("pages/First.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
