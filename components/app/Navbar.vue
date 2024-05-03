<template>
  <div class="flex w-100 bg-gradient-to-r from-primary-400 to-primary-600">
    <span>{{ username }}</span>
  </div>
</template>

<script setup lang="ts">
export interface NavBarComponentType {
  username: string;
}
withDefaults(defineProps<NavBarComponentType>(), {});
</script>
