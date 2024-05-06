export default defineNuxtRouteMiddleware(async (to, _from) => {
  const config = useRuntimeConfig();
  const { logout } = useAuthStore();
  const { unloadUser } = useUserStore();
  const { refreshAccessToken, setAccessToken } = useAccessToken(
    config.public.appServer
  );
  const currentToken = useCookie("token");
  console.log(currentToken.value);
  if (!currentToken.value) {
    try {
      await refreshAccessToken();
    } catch (err) {
      logout();
      unloadUser();
    }

    if (to.fullPath === "/login" || to.fullPath === "/") {
      return navigateTo("/login", { replace: true });
    }
    useCookie("redirect", { path: "/", maxAge: 900 }).value = to.fullPath;
    return navigateTo("/login?redirect=" + to.fullPath, { replace: true });
  }
});
