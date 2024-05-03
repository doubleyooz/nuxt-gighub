<template>
  <div v-if="userStore.loadedUser" class="flex flex-col gap-8 h-full px-4 mt-8">
    <app-card
      class="flex flex-col justify-center items-center rounded-t-xl mt-36"
      variant="solid"
      title-slot
    >
      <template #title>
        <users-chips-rating text="4.8" />
      </template>
      <template #content>
        <img
          class="w-36 h-36 border-4 border-white transition-all duration-400 ease-in-out rounded-full absolute top-32 left-0 right-0 mx-auto"
          src="https://randomuser.me/api/portraits/men/2.jpg"
        />

        <span class="mt-8 text-3xl font-bold">{{
          userStore.loadedUser.name
        }}</span>
      </template>
    </app-card>
    <users-description :text="userStore.loadedUser.description" />
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
