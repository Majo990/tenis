import { boot } from "quasar/wrappers";
import axios from "axios";
import { Cookies } from "quasar";

const api = axios.create({
  baseURL: "http://" + location.hostname + ":3000",
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default boot(({ app }) => {
  const token = Cookies.get("token");
  if (token)
    api.defaults.headers.common["Authorization"] = `Bearer ${token}` || null;
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
});

export { api };
