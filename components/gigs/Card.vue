<template>
  <div class="flex flex-col p-3 bg-white outline outline-1 rounded-lg outline-gray-300 gap-3">
    <div>
      <div class="flex text-2xl justify-between gap-2">
        <span class="font-semibold cursor-pointer" @click="emit('click:title')">{{ title }}</span>
        <app-button :icon="filledHeart ? 'mdi:heart' : 'mdi:heart-outline'" variant="text"
          @click="emit('click:heart')" />
      </div>
      <span v-if="createdAt" class="text-xs text-gray-500">{{
        createdAt.getMinutes()
      }}</span>
    </div>
    <div>
      <span>Budget: <strong>{{ budget }}$</strong></span>
    </div>
    <span class="text-xl text-gray-800 text-ellipsis">{{ description }}</span>
    <app-skills-chips :skills="skills" hide-empty />

  </div>
</template>

<script setup lang="ts">
import type { Gig } from "~/models/gig.model";

export interface GigCardComponentType extends Gig {
  filledHeart?: boolean;
}

const emit = defineEmits(["click:title", "click:heart"]);

withDefaults(defineProps<GigCardComponentType>(), {});
</script>
