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
        meta: { auth: true }
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/NoHeadLayout.vue"),
    children: [
      {
        path: "estimates/create",
        name: "estimates.create",
        component: () => import("pages/Estimates/Create.vue"),
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
        path: "estimates",
        name: "estimates.index",
        component: () => import("pages/Estimates/Index.vue"),
        meta: { parent: "home", auth: true },
      },
      {
        path: "estimates/:id",
        name: "estimates.show",
        component: () => import("pages/Estimates/Show.vue"),
        meta: { parent: "home", auth: true },
        props: true,
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
    path: "/auth",
    component: () => import("layouts/ZeroLayout.vue"),
    children: [
      {
        path: "",
        name: "auth.login",
        component: () => import("pages/Auth/Login.vue"),
        meta: { guest: true },
      },
      {
        path: "verify-code",
        name: "auth.verify-code",
        component: () => import("pages/Auth/VerifyCode.vue"),
        meta: { guest: true },
      },
      {
        path: "profile",
        name: "auth.profile",
        component: () => import("pages/Auth/Profile.vue"),
        meta: { auth: true },
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
