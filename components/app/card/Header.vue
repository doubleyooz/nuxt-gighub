<template>
  <div class="flex flex-col px-1 min-w-40 w-full items-center">
    <div>
      <img v-if="img" :src="img.src" :height="img.height" :width="img.width" />
    </div>
    <div class="flex w-full justify-center items-center pt-2">
      <slot v-if="titleSlot" name="title" />
      <div v-else class="flex items-end w-full gap-3 flex-wrap overflow-hidden">
        <span
          v-if="headerTitle"
          class="text-lg font-semibold overflow-hidden text-ellipsis text-nowrap"
          >{{ headerTitle }}</span
        >
        <span
          v-if="headerDescription"
          class="overflow-hidden text-ellipsis text-nowrap"
          >{{ headerDescription }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface HeaderCardComponentType {
  headerTitle?: string;
  headerDescription?: string;
  titleSlot?: boolean;
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
  headerDescription: undefined,
  img: undefined,
});
</script>
