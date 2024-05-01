export default defineNuxtRouteMiddleware(async (to, _from) => {
  const config = useRuntimeConfig();
  const { refreshAccessToken } = useAccessToken(config.public.appServer);
  const currentToken = useCookie("token");

  if (!currentToken.value) {
    await refreshAccessToken();
    console.log({ token: useCookie("token").value, fullpath: to.fullPath });
    if (to.fullPath === "/login" || to.fullPath === "/") {
      return navigateTo("/login", { replace: true });
    }
    useCookie("redirect", { path: "/", maxAge: 900 }).value = to.fullPath;
    return navigateTo("/login?redirect=" + to.fullPath, { replace: true });
  }
});
