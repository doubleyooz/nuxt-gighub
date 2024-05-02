export default defineNuxtRouteMiddleware(async (to, _from) => {
  const config = useRuntimeConfig();
  const { verifyAccessToken, setAccessToken } = useAccessToken(
    config.public.appServer
  );

  try {
    await verifyAccessToken();

    return navigateTo("/");
  } catch {
    setAccessToken(null);
  }
});
