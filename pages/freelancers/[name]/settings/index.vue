<template>
  <div>
    <pre>{{ userStore.loadedUser }}</pre>
    <div class="flex w-full justify-center mt-4">
      <app-button
        class="small ml-2"
        size="large"
        :loading="loading"
        :text="'Earn funds'"
        @click="earnFunds"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const { earnFunds } = useContracts();
const loading = ref(false);
</script>
