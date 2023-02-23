import { defineStore } from "pinia";
import axios from "axios";

export const useMainStore = defineStore("main", {
  state: () => ({
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,

    /* Sample data (commonly used) */
    clients: [],
    history: [],
  }),
  actions: {
    setUser(payload) {
      if (payload.name) {
        this.userName = payload.name;
      }
      if (payload.email) {
        this.userEmail = payload.email;
      }
      if (payload.avatar) {
        this.userAvatar = payload.avatar;
      }
    },

    async fetch(sampleDataKey) {
      await axios
        .get(`${import.meta.env.VITE_API_URL_SHALOM }/user`, { withCredentials: true })
        .then((r) => {
          if (r.data && r.data.users) {
            this[sampleDataKey] = r.data.users;
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
});