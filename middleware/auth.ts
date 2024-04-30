export default defineNuxtRouteMiddleware(async (to, _from) => {
  const authStore = useAuthStore();
  if (!authStore.accessToken) {
    await authStore.refreshToken();
    console.log(authStore.accessToken);
    if (to.fullPath === "/login" || to.fullPath === "/") {
      return navigateTo("/login", { replace: true });
    }
    useCookie("redirect", { path: "/", maxAge: 900 }).value = to.fullPath;
    return navigateTo("/login?redirect=" + to.fullPath, { replace: true });
  }
});
