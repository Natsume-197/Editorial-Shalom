import { userStore } from "../stores/user";
import router from "@/router";
import { useToast } from "vue-toastification";
import { api } from "./axios";

const store = userStore();
const toast = useToast();

const getRequestsUser = async (id) => {
  return new Promise((resolve, reject) => {
    api.get("/sales_request_user/" + id)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
};

const createRequestSale = async (data) => {
  await api
    .post("/sales_request", data)
    .then((response) => {
      console.log(response);
      toast.success(`Se ha realizado el pedido.`, {
        timeout: 5000,
        position: "top-right",
        icon: true,
      });
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        // Si la respuesta de la API tiene un estado, el error provino de la API
        const status = error.response.status;
        const message = error.response.data.message;
        toast.error(`Error al enviar la solicitud (${status}): ${message}`, {
          timeout: 5000,
          position: "top-right",
          icon: true,
        });
        console.log(error);
      } else if (error.request) {
        // Si la solicitud no pudo completarse, es un error de red
        toast.error(
          `Error al enviar la solicitud: Conexión con la API rechazada.`,
          {
            timeout: 5000,
            position: "top-right",
            icon: true,
          }
        );
        console.log(error);
      } else {
        // En otros casos, puede haber un error en el código
        toast.error(`Error al enviar la solicitud: ${message}`, {
          timeout: 5000,
          position: "top-right",
          icon: true,
        });
      }
      console.log(error);
    });
};

const registerBook = async (data) => {
  await api
    .post("/book", data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    )
    .then((response) => {
      console.log(response);
      toast.success(`Se ha registrado de forma exitosa.`, {
        timeout: 5000,
        position: "top-right",
        icon: true,
      });
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        // Si la respuesta de la API tiene un estado, el error provino de la API
        const status = error.response.status;
        const message = error.response.data.message;
        toast.error(`Error al enviar la solicitud (${status}): ${message}`, {
          timeout: 5000,
          position: "top-right",
          icon: true,
        });
        console.log(error);
      } else if (error.request) {
        // Si la solicitud no pudo completarse, es un error de red
        toast.error(
          `Error al enviar la solicitud: Conexión con la API rechazada.`,
          {
            timeout: 5000,
            position: "top-right",
            icon: true,
          }
        );
        console.log(error);
      } else {
        // En otros casos, puede haber un error en el código
        toast.error(`Error al enviar la solicitud: ${message}`, {
          timeout: 5000,
          position: "top-right",
          icon: true,
        });
      }
      console.log(error);
    });
};

const registerUser = async (data) => {
  if (data.switch.includes("isVerified")) {
    data.is_verified = true;
  } else {
    data.is_verified = false;
  }

  if (data.switch.includes("isAdmin")) {
    data.is_admin = true;
  } else {
    data.is_admin = false;
  }

  await api
    .post("/register", {
      name: data.name,
      second_name: data.second_name,
      email: data.email,
      password: data.password,
      address: data.address,
      cellphone: data.cellphone,
      is_verified: data.is_verified,
      is_admin: data.is_admin,
    })
    .then((response) => {
      console.log(response);
      toast.success(`Se ha registrado de forma exitosa.`, {
        timeout: 5000,
        position: "top-right",
        icon: true,
      });
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        // Si la respuesta de la API tiene un estado, el error provino de la API
        const status = error.response.status;
        const message = error.response.data.message;
        toast.error(`Error al enviar la solicitud (${status}): ${message}`, {
          timeout: 5000,
          position: "top-right",
          icon: true,
        });
        console.log(error);
      } else if (error.request) {
        // Si la solicitud no pudo completarse, es un error de red
        toast.error(
          `Error al enviar la solicitud: Conexión con la API rechazada.`,
          {
            timeout: 5000,
            position: "top-right",
            icon: true,
          }
        );
        console.log(error);
      } else {
        // En otros casos, puede haber un error en el código
        toast.error(`Error al enviar la solicitud: ${message}`, {
          timeout: 5000,
          position: "top-right",
          icon: true,
        });
      }
      console.log(error);
    });
};

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
        timeout: 4000,
        position: "top-right",
        icon: true,
      });
    })
    .catch((error) => {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        timeout: 4000,
        position: "top-right",
        icon: true,
      });
    });
};

export { logout, registerUser, registerBook, createRequestSale, getRequestsUser };
