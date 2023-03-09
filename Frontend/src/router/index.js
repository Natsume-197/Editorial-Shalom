import { createRouter, createWebHistory } from "vue-router";
import { userStore } from "../stores/user";
import { api } from "../utils/axios";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/principal/HomePage.vue"),
    },
    {
      path: "/books",
      name: "Books",
      component: () => import("../views/principal/Books.vue"),
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../views/principal/AboutUs.vue"),
    },
    {
      path: "/contact",
      name: "Contact",
      component: () => import("../views/principal/ContactUs.vue"),
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
      component: () => import("../views/principal/ProfilePage.vue"),
      meta: { requireAuth: true },
    },
    {
      path: "/dashboard/",
      redirect: "/dashboard/inicio",
      meta: { requireAuth: true },
    },
    {
      path: "/dashboard/inicio",
      name: "BoardPage",
      component: () => import("../views/admin/Home.vue"),
      meta: { requireAuth: true },
    },
    {
      path: "/dashboard/usuarios/visualizar",
      name: "UsersVisualization",
      component: () => import("../views/admin/users/Visualization.vue"),
      meta: { requireAuth: true },
    },
    {
      path: "/dashboard/usuarios/agregar",
      name: "UsersFormAdd",
      component: () => import("../views/admin/users/FormAddUser.vue"),
      meta: { requireAuth: true },
    },
    {
      path: "/dashboard/inventario/agregar",
      name: "InventoryFormAdd",
      component: () => import("../views/admin/inventory/FormAddItem.vue"),
      meta: { requireAuth: true },
    },
    {
      path: "/dashboard/perfil",
      name: "ProfileAdmin",
      component: () => import("../views/admin/Profile.vue"),
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
      path: "/search",
      name: "SearchBook",
      props: route => ({ query: route.query.query }),
      component: () => import("../views/principal/SearchPage.vue"),
    },
    {
      path: "/book/:id/:name?",
      name: "DetailsBook",
      component: () => import("../views/principal/DetailsPage.vue"),
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: () => import("../views/principal/NotFoundPage.vue"),
    },
  ],
});

// Global Route Guard
router.beforeEach(async (to, _from, next) => {
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
    // Prevent logged-in users from accessing the login or register pages
    if (to.name === "DetailsBook") {
      let response = null;
      let id_book = null;
      let received_title = null;
      let original_title = null;
      let fixed_title = null;

      received_title = to.params.name;
      id_book = to.params.id;

      try {
        response = await api.get("/book/" + to.params.id);

        //console.log("Received name:", to.params.name)
        //console.log("Original title:", response.data.book.book_t[0].title)
        //console.log("Fixed title:", response.data.book.book_t[0].title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))

        original_title = response.data.book.book_t[0].title.toLowerCase();
        fixed_title = original_title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      } catch (error) {
        console.log(error);
        next();
        return await router.push("/page-404");
        
      }

      if (to.params.name) {
        if (received_title === fixed_title) {
          next();
        } else {
          router.push(`book/${id_book}/${fixed_title}`);
          next();
        }
      } else {
        if (response.data.status === "404") {
          console.log(response);
          router.push("/page-404");
        }

        router.push(`book/${id_book}/${fixed_title}`);
        next();
      }
    } else {
      if (to.name === "Login" || to.name === "Register") {
        if (store.isLoggedIn) {
          next({ path: "/" });
        } else {
          next();
        }
      } else {
        next();
      }
    }
  }
});

export default router;
