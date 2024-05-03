<template>
  <app-chip prepend-icon="uil:star" :text="text" variant="text" />
</template>
<script setup lang="ts">
export interface UserRatingComponentType {
  text?: string;
}

withDefaults(defineProps<UserRatingComponentType>(), {
  text: undefined,
});
</script>
