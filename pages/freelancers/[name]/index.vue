<template>
  <div v-if="userStore.loadedUser" class="flex flex-col gap-8 h-full px-4 mt-8">
    <div
      class="flex w-full justify-between p-6 border border-slate-100 rounded-lg"
    >
      <div class="flex">
        <app-user-avatar class="h-20 w-20 mr-4" rounded show-border />

        <div class="flex flex-col items-top">
          <span class="text-3xl font-bold">{{
            userStore.loadedUser.name
          }}</span>
          <span class="text-slate-400 tracking-wide">My location</span>
        </div>
      </div>
      <users-chips-rating text="4.8" />
      <app-button
        v-if="userStore.isLoggedUser"
        class="hidden xs:flex"
        :text="'Profile settings'"
        size="x-small"
        rounded
        @click="
          router.push(`/freelancers/${userStore.loadedUser?.name}/settings`)
        "
      />
    </div>
    <div
      class="flex flex-col gap-6 w-full justify-between p-6 border border-slate-100 rounded-lg"
    >
      <users-description
        :text="userStore.loadedUser.title"
        :no-edit="!userStore.isLoggedUser"
        :empty-text="'No title added'"
        name="title"
        items-center
      />
      <users-description
        :text="userStore.loadedUser.description"
        :no-edit="!userStore.isLoggedUser"
        type="textarea"
        justify-between
        empty-text="No description was added"
      />
    </div>

    <users-settings-wallet
      :address="userStore.loadedUser.wallet"
      @update:wallet="authStore.handleMetaSignIn()"
      @remove:wallet="userStore.setWallet(null)"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "default",
});
const route = useRoute();
const router = useRouter();

const config = useRuntimeConfig();
const userStore = useUserStore();
const authStore = useAuthStore();

const {} = useFormRules();

const loading = ref(false);
const { setAccessToken, refreshAccessToken } = useAccessToken(
  config.public.appServer
);

onBeforeMount(async () => {
  try {
    loading.value = true;
    await userStore.loadUser(route.params.name as string);
  } catch (err) {
    await refreshAccessToken();
    await userStore.loadUser(route.params.name as string);
  }
});
</script>
