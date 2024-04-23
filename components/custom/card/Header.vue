<template>
  <div class="flex flex-col px-3 w-100 items-center">
    <div>
      <img v-if="img" :src="img.src" :height="img.height" :width="img.width" />
    </div>
    <div>
      <span v-if="title" class="text-lg font-semibold">{{ title }}</span>
      <span v-if="description">{{ description }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface HeaderCardComponentType {
  title?: string;

  description?: string;

  img?: imgProps;
}

export type imgProps = {
  src: string;
  height?: number;
  width?: number;
  alt: string;
};

const props = withDefaults(defineProps<HeaderCardComponentType>(), {
  title: undefined,
  description: undefined,
  img: undefined,
});
</script>
