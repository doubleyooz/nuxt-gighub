<template>
  <div class="flex flex-col h-screen">
    <app-navbar>
      <template #left>
        <img
          class="h-14 w-14 cursor-pointer"
          src="/logo.png"
          alt="gighub"
          @click="router.push('/')"
        />
      </template>
      <template #right>
        <app-user-avatar
          class="w-8 h-8 cursor-pointer"
          :src="loggedUserPicture"
          rounded
          @click:avatar="router.push(`/freelancers/${loggedUser?.name}`)"
        />
      </template>
    </app-navbar>
    <main class="h-full">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const authStore = useAuthStore();
const { loggedUserPicture, loggedUser } = storeToRefs(authStore);
</script>
