import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const loadedUser = ref();
  const loading = ref(true);
  const config = useRuntimeConfig();

  const { authHeaders } = useAccessToken(config.public.appServer);

  async function loadUser(username: string) {
    if (loadedUser.value?.name === username) return;

    loading.value = true;
    try {
      const result = await fetch(
        `${config.public.appServer}/users?name=${username}`,
        authHeaders()
      );
      loadedUser.value = (await result.json()).data[0];

      console.log({ result: loadedUser.value });
    } catch (err) {
      console.log(err);

      const token = useCookie("token");
      token.value = null;
    } finally {
      loading.value = false;
    }

    console.log({ result: loadedUser.value });
  }

  return { loadUser, loadedUser };
});
