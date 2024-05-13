import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "~/models/user.model";

export interface LoadedUser extends User {}
export const useUserStore = defineStore("user", () => {
  const config = useRuntimeConfig();

  const { fetchApi } = useAccessToken(config.public.appServer);

  const loadedUser = ref<LoadedUser>();

  const storedUser: Ref<User | null> = useCookie("loggedUser");

  const loggedUser = ref<User | null>(
    storedUser.value ? storedUser.value : null
  );

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

  async function loadUsers({ name, email }: { name?: string; email?: string }) {
    let query = "";
    if (name) query += `?name=${name}`;
    else if (email) query += `?email=${email}`;
    const result: User[] = (await fetchApi(`users${query}`)).data;
    console.log({ result });
    return result || [];
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
  const isLoggedUser = computed(
    () => loggedUser.value?.name === loadedUser.value?.name
  );

  async function unloadUser() {
    loadedUser.value = undefined;
  }

  const userPicture = computed(() =>
    getImageUrl(
      config.public.imageServer,
      loadedUser.value?.picture._id,
      loadedUser.value?.picture.ext
    )
  );

  return {
    loadUser,
    loadUsers,
    isLoggedUser,
    userPicture,
    unloadUser,
    setWallet,
    loadedUser,
  };
});
