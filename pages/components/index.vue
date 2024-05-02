<template>
  <div class="flex gap-4">
    <span
      v-for="(item, index) in components"
      :key="index"
      class="cursor-pointer"
      @click="navigateTo(`/components/${item}`)"
    >
      {{ item }}
    </span>
  </div>
</template>

<script setup lang="ts">
const components = ["Button", "Chip"];
</script>
