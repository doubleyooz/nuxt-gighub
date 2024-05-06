<template>
  <div class="flex flex-col bg-slate-100 rounded-lg px-3 py-2">
    <div class="flex gap-3 py-2 items-center">
      <app-user-avatar class="w-10 h-10" rounded />
      <span class="font-bold">{{ username }}</span>
    </div>
    <div class="w-full border-b" />
    <div class="flex flex-col">
      <span class="text-xs text-gray-600 font-medium">Offer</span>
      <span class="text-sm font-semibold">{{ offer }}$</span>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface PropositionCardComponentType {
  username: string;
  offer: number;
}

withDefaults(defineProps<PropositionCardComponentType>(), {});
</script>
