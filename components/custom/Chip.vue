<template>
  <div
    class="bg-slate-200 rounded-xl w-min px-2"
    :class="[clickable ? 'cursor-pointer' : '']"
  >
    <span> {{ text }} </span>
  </div>
</template>

<script setup lang="ts">
export type Variant =
  | "warning"
  | "success"
  | "error"
  | "blue"
  | "grey"
  | "dark"
  | "primary"
  | "secondary";

export interface ChipComponentType {
  text: string;
  variant: Variant;
  closeable?: boolean;
  clickable?: boolean;
}

withDefaults(defineProps<ChipComponentType>(), {});
</script>
