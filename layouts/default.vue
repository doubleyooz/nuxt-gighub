<template>
  <div class="flex flex-col h-screen">
    <app-navbar class="px-6" :username="username">
      <template #left>
        <img
          class="cursor-pointer"
          src="/logo.png"
          height="60"
          width="60"
          alt="gighub"
          @click="router.push('/')"
        /> </template
    ></app-navbar>
    <main class="h-full">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const authStore = useAuthStore();
const userStore = useUserStore();
const { loadedUser } = storeToRefs(userStore);
const { loggedUser } = storeToRefs(authStore);

const username = computed<string>(() => {
  console.log({ loggedUser: loggedUser.value, loadedUser: loadedUser?.value });
  return loadedUser?.value?.name || loggedUser?.value?.name || "name";
});
</script>
