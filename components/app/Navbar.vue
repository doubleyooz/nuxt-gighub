<template>
  <div
    class="flex w-100 justify-between items-center bg-gradient-to-r from-primary-400 to-primary-600 px-6"
  >
    <slot name="left" />
    <slot name="right" />
  </div>
</template>

<script setup lang="ts">
export interface NavBarComponentType {}
withDefaults(defineProps<NavBarComponentType>(), {});
</script>
