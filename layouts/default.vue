<template>
  <div class="flex flex-col h-screen">
    <custom-navbar :username="loadedUser?.name || 'name'" />
    <pre>  {{ loadedUser }}</pre>
    <main class="h-full">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { loggedUser } = useAuthStore();
const { loadedUser } = useUserStore();
onBeforeMount(() => {
  console.log({ loggedUser });
  if (loggedUser && !loadedUser.value) {
    loadedUser.value.name = loggedUser.name;
  }
});
</script>
