import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "~/models/user.model";

export interface LoadedUser extends User {}
export const useUserStore = defineStore("user", () => {
  const loadedUser = ref<LoadedUser>();
  const config = useRuntimeConfig();

  const { fetchApi } = useAccessToken(config.public.appServer);

  async function loadUser(username: string) {
    console.log({
      loadedUser: loadedUser.value,
      username,
      bool: loadedUser.value?.name === username,
    });
    if (loadedUser.value?.name === username) return;

    const result = await fetchApi(`users?name=${username}`);

    loadedUser.value = result.data[0];

    console.log({ result: loadedUser.value });
  }

  async function setWallet(address: string | null) {
    if (!loadedUser.value) return;
    const response = await fetchApi(`users`, {
      method: "PUT",

      body: {
        wallet: address,
      },
    });

    loadedUser.value.wallet = response.data.address;
  }

  async function unloadUser() {
    loadedUser.value = undefined;
  }

  return { loadUser, unloadUser, setWallet, loadedUser };
});
