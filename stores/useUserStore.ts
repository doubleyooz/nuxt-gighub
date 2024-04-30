import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const loadedUser = ref();
  const loading = ref(true);
  const config = useRuntimeConfig();

  const authHeaders = (token: string) => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  async function loadUser(username: string) {
    if (loadedUser.value?.name === username) return;

    loading.value = true;
    try {
      const result = await fetch(
        `${config.public.appServer}/users?name=${username}`,
        authHeaders(useCookie("token").value || "")
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
