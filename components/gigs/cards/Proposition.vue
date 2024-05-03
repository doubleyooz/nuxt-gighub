<template>
  <div>
    <img />
    <span>{{ username }}</span>
    <span>{{ price }}</span>
  </div>
</template>

<script setup lang="ts">
export interface PropositionCardComponentType {
  username: string;
  price: number;
}

withDefaults(defineProps<PropositionCardComponentType>(), {});
</script>
