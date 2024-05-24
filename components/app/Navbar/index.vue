<template>
  <div
    class="flex w-100 justify-between items-center px-6"
    :class="[
      noBackground ? '' : 'bg-gradient-to-r from-primary-400 to-primary-600',
    ]"
  >
    <slot name="left" />
    <slot name="right" />
  </div>
</template>

<script setup lang="ts">
export interface NavBarComponentType {
  noBackground: boolean;
}
withDefaults(defineProps<NavBarComponentType>(), {});
</script>
