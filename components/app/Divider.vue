<template>
  <div
    :class="[
      vertical ? 'h-full' : 'w-full',
      overwriteMargin ? '' : 'my-4',
      thickness,
    ]"
  />
</template>
<script setup lang="ts">
export interface DividerComponentType {
  size?: Size;
  vertical?: boolean;
  overwriteMargin?: boolean;
}

const props = withDefaults(defineProps<DividerComponentType>(), {
  size: "small",
});

const thickness = computed(() => {
  switch (props.size) {
    case "x-small":
      return "border-b-0";
    case "small":
      return "border-b";
    case "medium":
      return "border-b-2";
    case "large":
      return "border-b-3";
    default:
      return "border-b";
  }
});
</script>
