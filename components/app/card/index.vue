<template>
  <div
    class="px-3 pb-3"
    :class="[
      rounded ? 'rounded-lg' : '',
      outline ? '' : 'border-0',
      variantClass,
    ]"
  >
    <app-card-header
      :title="title"
      :description="description"
      :img="img"
      :title-slot="titleSlot"
      :no-edit="noEdit"
      @click:edit="emit('click:edit')"
    >
      <template #title> <slot name="title" /> </template
    ></app-card-header>
    <div class="flex flex-col">
      <slot name="content" />
    </div>
    <div v-if="!noFooter" class="flex flex-col">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HeaderCardComponentType } from "./Header.vue";

type CardVariant = "blank" | "solid";

export interface CardComponentType extends HeaderCardComponentType {
  outline?: boolean;
  rounded?: boolean;
  noFooter?: boolean;
  variant?: CardVariant;
}

const props = withDefaults(defineProps<CardComponentType>(), {
  variant: "blank",
});

const emit = defineEmits(["click:edit"]);
const variantClass = computed(() => {
  switch (props.variant) {
    case "blank":
      return "";
    case "solid":
      return "bg-slate-100";

    default:
      return "";
  }
});
</script>
