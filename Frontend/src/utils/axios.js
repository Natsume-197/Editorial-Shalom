// Clase que permite la conexión con una o varias APIs
import axios from 'axios'
import { userStore } from "../stores/user";
import { useToast } from 'vue-toastification'

export const BASE_API_URLS = [
  // Conexión con la API de la Editorial Shalom de acuerdo al entorno
  { name: 'ShalomAPI', endpoint: import.meta.env.VITE_API_URL_SHALOM },
]
const toast = useToast()
const api = axios.create({
  baseURL: BASE_API_URLS[0].endpoint, 
  timeout: 5000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(error.response)
    if (error.response && error.response.status === 401) {
      
      const store = userStore();

      toast.error(`${error.response.data.message}`, {
        timeout: 5000,
        position: 'top-center',
        icon: true
      })

      store.$patch((state) => {
        state.isLoggedIn = false;
        state.userInfo = {
          name: null,
          email: null,
        };
      });
      // clear the browser localStorage
      window.localStorage.clear();

    }else if (error.response && error.response.status === 500){
      
    }
    return Promise.reject(error)
  }
)

export { api }
