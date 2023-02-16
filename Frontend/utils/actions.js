import { userStore } from "../src/stores/user";
import router from "@/router";
import { useToast } from "vue-toastification";
import { api } from "./axios";

const store = userStore();
const toast = useToast();

const logout = () => {

    api
      .get("/logout")
      .then((response) => {
        // clear pinia state
        store.$patch((state) => {
          state.isLoggedIn = false;
          state.userInfo = {
            name: null,
            email: null,
          };
        });
        // clear the browser localStorage
        window.localStorage.clear();
        // redirect to Home
        router.push("/");
        // Notify
        toast.success(`${response.data.message}`, {
          timeout: 2000,
          position: "top-center",
          icon: true,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(`${error.response.data.message}`, {
          timeout: 2000,
          position: "top-center",
          icon: true,
        });
      });
  };

export { logout }
