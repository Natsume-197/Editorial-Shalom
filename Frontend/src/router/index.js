import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import { userStore } from "../stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/account/RegisterPage.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/account/LoginPage.vue"),
    },
    {
      path: "/account/verify/:token",
      name: "Verify",
      component: () => import("../views/account/VerifyPage.vue"),
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("../views/ProfilePage.vue"),
      meta: { requireAuth: true },
    },
    {
      path: "/dashboard",
      name: "BoardPage",
      component: () => import("../views/BoardPage.vue"),
      meta: { requireAuth: true },
    },
    {
      path: "/account/resetPassword",
      name: "Form-PasswordReset",
      component: () => import("../views/account/ForgottenPassword.vue"),
    },
    {
      path: "/account/resetPassword/:token",
      name: "ResetPasswordLoading",
      component: () => import("../views/account/RestorePassword.vue"),
    },
    {
      path: "/search/",
      name: "SearchBook",
      component: () => import("../views/book/SearchPage.vue"),
    },
    {
      path: "/book/:id",
      name: "DetailsBook",
      component: () => import("../views/book/DetailsPage.vue"),
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: () => import("../views/NotFoundPage.vue"),
    },
  ],
});

// Global Route Guard
router.beforeEach((to, _from, next) => {
  const store = userStore();
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (store.isLoggedIn) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});

export default router;
