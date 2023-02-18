import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { useStyleStore } from "./stores/style";
import { darkModeKey, styleKey } from "./assets/style/config";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "animate.css";
import "./assets/css/tailwind.css";
import messages from "@intlify/unplugin-vue-i18n/messages";

const pinia = createPinia();

// Language Configuration
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "es",
  fallbackLocale: "es",
  availableLocales: ["es", "en"],
  messages,
});

pinia.use(piniaPluginPersistedstate);

createApp(App)
  .use(pinia)
  .use(router)
  .use(Toast, {
    transition: "Vue-Toastification__fade",
    maxToasts: 3,
    newestOnTop: true,
  })
  .use(i18n)
  .mount("#app");

const styleStore = useStyleStore(pinia);
styleStore.setStyle(localStorage[styleKey] ?? "basic");

/* Dark mode */
if (
  (!localStorage[darkModeKey] &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ||
  localStorage[darkModeKey] === "1"
) {
  styleStore.setDarkMode(true);
}