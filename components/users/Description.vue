<template>
  <app-card title="Description" variant="solid" rounded>
    <template #content
      ><span v-if="text">{{ text }}</span>
      <span v-else>No description added...</span></template
    >
  </app-card>
</template>
<script setup lang="ts">
export interface UserDescriptionComponentType {
  text?: string;
}

const props = withDefaults(defineProps<UserDescriptionComponentType>(), {
  text: undefined,
});
</script>
