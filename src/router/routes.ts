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
        path: "estimates/create",
        name: "estimates.create",
        component: () => import("pages/Estimates/Create2.vue"),
      },
      {
        path: "orders",
        name: "orders.index",
        component: () => import("pages/Orders/Index.vue"),
        meta: { auth: true },
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
        path: "estimates/:id/result",
        name: "estimates.result",
        component: () => import("pages/Estimates/Result.vue"),
        meta: { parent: "home" },
        props: true,
      },
      {
        path: "catalog",
        name: "catalog.all",
        component: () => import("pages/Catalog/Index.vue"),
      },
      {
        path: "catalog/categories",
        name: "catalog.index",
        component: () => import("pages/Catalog/Categories.vue"),
      },
      {
        path: "catalog/:id",
        name: "catalog.show",
        component: () => import("pages/Catalog/Show.vue"),
        props: true,
      },
      {
        path: "catalog/favorites",
        name: "catalog.favorites",
        component: () => import("pages/Catalog/Favorites.vue"),
        meta: { parent: "profile" },
      },
      {
        path: "basket",
        name: "basket.index",
        component: () => import("pages/Basket/Index.vue"),
      },
      {
        path: "notifications",
        name: "notifications.index",
        component: () => import("pages/Notifications/Index.vue"),
      },
    ],
  },

  {
    path: "/profile",
    component: () => import("layouts/NoHeadLayout.vue"),
    children: [
      {
        path: "",
        name: "profile.index",
        component: () => import("pages/Profile/Index.vue"),
      },
      {
        path: "update",
        name: "profile.update",
        component: () => import("pages/Profile/Update.vue"),
        meta: { auth: true },
      },
      {
        path: "notifications",
        name: "profile.notifications",
        component: () => import("pages/Profile/Notifications.vue"),
        meta: { auth: true },
      },
    ],
  },

  {
    path: "/referrals",
    component: () => import("layouts/NoHeadLayout.vue"),
    children: [
      {
        path: "",
        name: "referrals.index",
        component: () => import("pages/Referrals/Index.vue"),
        meta: { auth: true },
      },
      {
        path: "output",
        name: "referrals.output",
        component: () => import("pages/Referrals/Output.vue"),
        meta: { auth: true },
      },
      {
        path: "link",
        name: "referrals.link",
        component: () => import("pages/Referrals/Link.vue"),
        meta: { auth: true },
      },
      {
        path: "rules",
        name: "referrals.rules",
        component: () => import("pages/Referrals/Rules.vue"),
        meta: { auth: true },
      },
      {
        path: "friends",
        name: "referrals.friends",
        component: () => import("pages/Referrals/Friends.vue"),
        meta: { auth: true },
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
    ],
  },

  {
    path: "/start",
    component: () => import("layouts/ZeroLayout.vue"),
    children: [
      {
        path: "",
        name: "start",
        component: () => import("pages/Start.vue"),
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
