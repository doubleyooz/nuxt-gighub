<template>
  <div class="group flex w-100 justify-center items-center px-2 cursor-pointer">
    <span
      class="text-sm"
      :class="[
        isSelected
          ? 'text-primary-700'
          : textWhite
          ? 'text-white group-hover:text-primary-600'
          : 'text-black group-hover:text-primary-600',
      ]"
    >
      {{ text }}</span
    >
    <Icon v-if="appendIcon" class="mt-[3px]" name="mdi:chevron-down" />
  </div>
</template>

<script setup lang="ts">
export interface NavBarItemComponentType {
  isSelected?: boolean;
  textWhite?: boolean;
  text: string;
  appendIcon?: boolean;
}
withDefaults(defineProps<NavBarItemComponentType>(), {});
</script>
