export default defineNuxtRouteMiddleware(async (to, _from) => {
  const authStore = useAuthStore();
  console.log(authStore.accessToken);
  await authStore.refreshToken();
  if (authStore.accessToken) return navigateTo("/");
});
