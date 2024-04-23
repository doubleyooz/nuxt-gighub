<template>
  <div
    class="px-3"
    :class="[rounded ? 'rounded-lg' : '', outline ? '' : 'border-0']"
  >
    <custom-card-header :title="title" :description="description" :img="img" />
    <div>
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HeaderCardComponentType } from "./Header.vue";

export interface CardComponentType extends HeaderCardComponentType {
  outline?: boolean;

  rounded?: boolean;
}

const props = withDefaults(defineProps<CardComponentType>(), {});
</script>
