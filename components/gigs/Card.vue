<template>
  <div
    class="flex flex-col p-3 bg-white outline outline-1 rounded-lg outline-gray-300 gap-3"
  >
    <div>
      <div class="flex text-2xl justify-between gap-2">
        <span class="font-semibold">{{ title }}</span>
        <button>dsd</button>
      </div>
      <span class="text-xs text-gray-500">{{ createdAt.getMinutes() }}</span>
    </div>
    <div>
      <span
        >Budget: <strong>{{ budget }}$</strong></span
      >
    </div>
    <span class="text-xl text-gray-800 text-ellipsis">{{ description }}</span>
    <div class="flex gap-2 overflow-auto">
      <custom-chip
        v-for="(item, index) in preferredTechnologies"
        :key="index"
        :text="item"
        class="bg-slate-200 rounded-xl w-min px-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface GigCardComponentType {
  title: string;
  description: string;
  createdAt: Date;
  budget: number;
  preferredTechnologies: string[];
  type: string;
}

withDefaults(defineProps<GigCardComponentType>(), {});
</script>
