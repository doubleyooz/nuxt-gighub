<template>
  <div
    class="flex w-100 justify-between items-center bg-gradient-to-r from-primary-400 to-primary-600 px-2"
  >
    <slot name="left" />
    <span>{{ username }}</span>
  </div>
</template>

<script setup lang="ts">
export interface NavBarComponentType {
  username: string;
}
withDefaults(defineProps<NavBarComponentType>(), {});
</script>
