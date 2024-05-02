<template>
  <div>
    <img />
    <span>{{ username }}</span>
  </div>
</template>

<script setup lang="ts">
export interface PropositionCardComponentType {
  username: string;
}

withDefaults(defineProps<PropositionCardComponentType>(), {});
</script>
