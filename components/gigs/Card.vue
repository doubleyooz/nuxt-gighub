<template>
  <div
    class="flex flex-col p-3 bg-white outline outline-1 rounded-lg outline-gray-300 gap-3"
  >
    <div>
      <div class="flex text-2xl justify-between gap-2">
        <span class="font-semibold cursor-pointer" @click="emit('open')">{{
          title
        }}</span>
        <button>dsd</button>
      </div>
      <span v-if="createdAt" class="text-xs text-gray-500">{{
        createdAt.getMinutes()
      }}</span>
    </div>
    <div>
      <span
        >Budget: <strong>{{ budget }}$</strong></span
      >
    </div>
    <span class="text-xl text-gray-800 text-ellipsis">{{ description }}</span>
    <div class="flex gap-2 overflow-auto">
      <app-chip
        v-for="(item, index) in preferredTechnologies"
        :key="index"
        :text="item"
        variant="grey"
        closeable
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Gig } from "~/models/gig.model";

export interface GigCardComponentType extends Gig {}

const emit = defineEmits(["open"]);

withDefaults(defineProps<GigCardComponentType>(), {});
</script>
