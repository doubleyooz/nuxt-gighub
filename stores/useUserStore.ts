import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const loadedUser = ref();
  const config = useRuntimeConfig();

  const { authHeaders, setAccessToken } = useAccessToken(
    config.public.appServer
  );

  async function loadUser(username: string) {
    console.log({
      loadedUser: loadedUser.value,
      username,
      bool: loadedUser.value?.name === username,
    });
    if (loadedUser.value?.name === username) return;

    const result = await fetch(
      `${config.public.appServer}/users?name=${username}`,
      authHeaders()
    );

    if (!result.ok) {
      console.log("here");
      setAccessToken(null);
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    loadedUser.value = (await result.json()).data[0];

    console.log({ result: loadedUser.value });

    console.log({ result: loadedUser.value });
  }

  return { loadUser, loadedUser };
});
