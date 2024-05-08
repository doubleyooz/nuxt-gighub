export default defineNuxtRouteMiddleware(async (to, _from) => {
  const config = useRuntimeConfig();
  const { refreshAccessToken, setAccessToken } = useAccessToken(
    config.public.appServer
  );

  try {
    console.log("control-access");
    await refreshAccessToken(false);
  } catch {
    setAccessToken(null);
  }
});
