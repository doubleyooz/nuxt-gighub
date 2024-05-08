export default defineNuxtRouteMiddleware(async (to, _from) => {
  const config = useRuntimeConfig();
  const { logout } = useAuthStore();
  const { unloadUser } = useUserStore();
  const { refreshAccessToken } = useAccessToken(config.public.appServer);

  const currentToken = useCookie("token");
  if (!currentToken.value) {
    try {
      await refreshAccessToken();
    } catch (err) {
      console.log(err);
      unloadUser();
      logout();
      if (to.fullPath === "/login" || to.fullPath === "/") {
        return navigateTo("/login", { replace: true });
      }
      useCookie("redirect", { path: "/", maxAge: 900 }).value = to.fullPath;
      return navigateTo("/login?redirect=" + to.fullPath, { replace: true });
    }
  }
});
