export default defineNuxtRouteMiddleware(async (to, _from) => {
  const config = useRuntimeConfig();
  const { verifyAccessToken } = useAccessToken(config.public.appServer);

  await verifyAccessToken();
  const currentToken = useCookie("token");
  if (currentToken.value) {
    return navigateTo("/");
  }
});
