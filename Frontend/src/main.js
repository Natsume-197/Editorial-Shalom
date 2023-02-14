import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import 'animate.css'
import './assets/tailwind.css'
import vco from "v-click-outside";
import messages from "@intlify/unplugin-vue-i18n/messages";
import VueCookies from 'vue-cookies'

const i18n = createI18n({
  legacy: false,
  globalInjection: true, 
  locale: 'es',
  fallbackLocale: 'es',
  availableLocales: ["es", "en"],
  messages
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .use(VueCookies)
  .use(pinia)
  .use(router)
  .use(Toast, {
    transition: 'Vue-Toastification__fade',
    maxToasts: 3,
    newestOnTop: true
  })
  .use(vco)
  .use(i18n)
  .use(VueCookies)
  .mount('#app')
