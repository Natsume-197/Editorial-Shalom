import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import 'animate.css'
import './assets/tailwind.css'
import vco from "v-click-outside";

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .use(pinia)
  .use(router)
  .use(Toast, {
    transition: 'Vue-Toastification__fade',
    maxToasts: 3,
    newestOnTop: true
  })
  .use(vco)
  .mount('#app')
