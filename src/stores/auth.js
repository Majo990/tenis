import { defineStore } from "pinia";
import { Cookies } from "quasar";
import { api } from "src/boot/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  getters: {
    isAutenticated: (state) => Boolean(state.user),
  },
  actions: {
    async getUser() {
      try {
        const res = await api.get("/api/user");
        this.user = res.data;
      } catch (error) {
        this.user = null;
      }
    },

    logout() {
      Cookies.remove("token");
      this.user = null;
      // this.router.replace("/home");
    },
  },
});
