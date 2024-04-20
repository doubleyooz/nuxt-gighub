<template>
  <div>
    <div class="flex flex-wrap w-100 gap-4 mt-2">
      <custom-button
        v-for="(item, index) in variants"
        :key="index"
        :text="item.text"
        :variant="item.variant"
        size="large"
        outline
        disabled
      />
    </div>

    <div class="flex flex-wrap w-100 gap-4 mt-2">
      <custom-button
        v-for="(item, index) in variants"
        :key="index"
        :text="item.text"
        :variant="item.variant"
        size="large"
        outline
      />
    </div>

    <div class="flex flex-wrap w-100 gap-4 mt-2">
      <custom-button
        v-for="(item, index) in variants"
        :key="index"
        :text="item.text"
        :variant="item.variant"
        size="large"
      />
    </div>

    <div class="flex flex-wrap w-100 gap-4 mt-2">
      <custom-button
        v-for="(item, index) in icons"
        :key="index"
        :icon="item.icon"
        :variant="item.variant"
        rounded
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ButtonComponentType } from "~/components/custom/Button.vue";

const variants: ButtonComponentType[] = [
  { variant: "warning", text: "warning" },
  { variant: "success", text: "success" },
  { variant: "error", text: "error" },
  { variant: "text", text: "text" },
  { variant: "blue", text: "blue" },
  { variant: "grey", text: "grey" },
  { variant: "dark", text: "dark" },
  { variant: "primary", text: "primary" },
  { variant: "secondary", text: "secondary" },
];

const icons: ButtonComponentType[] = [
  { variant: "warning", icon: "uil:github" },
  { variant: "success", icon: "uil:adjust-half" },
  { variant: "error", icon: "uil:baby-carriage" },
  { variant: "text", icon: "uil:bolt" },
  { variant: "blue", icon: "uil:baseball-ball" },
  { variant: "grey", icon: "uil:apple-alt" },
  { variant: "dark", icon: "uil:apple" },
  { variant: "primary", icon: "uil:arrow" },
  { variant: "secondary", icon: "uil:arrow-from-top" },
];
</script>
