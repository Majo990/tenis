import { boot } from "quasar/wrappers";
import { useUserStore } from "src/stores/auth";

const whiteList = ["/login", "auth-redirect"];

export default boot(async ({ router }) => {
  const userStore = useUserStore();
  await userStore.getUser();
  router.beforeEach((to, from, next) => {
    const isAutenticated = userStore.isAutenticated;
    console.log({ isAutenticated });
    if (to.meta.requiresAuth && !isAutenticated) {
      return next({ path: "/login" });
    }
    if (isAutenticated && whiteList.includes(to.path)) {
      return next(from);
    }
    return next();
  });
});



