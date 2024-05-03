<template>
  <div class="flex flex-col h-screen">
    <app-navbar :username="username" />
    <main class="h-full">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const userStore = useUserStore();
const { loadedUser } = storeToRefs(userStore);
const { loggedUser } = storeToRefs(authStore);

const username = computed<string>(() => {
  console.log({ loggedUser: loggedUser.value, loadedUser: loadedUser?.value });
  return loadedUser?.value?.name || loggedUser?.value?.name || "name";
});
</script>
