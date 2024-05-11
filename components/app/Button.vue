<template>
  <button
    class="group flex w-100 justify-center items-center gap-1"
    :class="[
      outline ? '' : '!border-0',
      `!color`,
      pressed ? 'active:scale-95' : '',
      sizeHeightPadding(),
      rounded ? 'rounded-full' : 'rounded-lg',
      disabled
        ? `${disabledVariants[variant]} pointer-events-none`
        : outline
        ? outlinedVariants[variant]
        : variants[variant],
    ]"
    :disabled="disabled || loading"
  >
    <Loader2 v-if="loading" class="h-full mr-2 animate-spin" />
    <template v-else>
      <img v-if="img" class="h-full text" :src="img" alt="" />
      <Icon v-if="prependIcon" :name="prependIcon" />
      <Icon v-if="icon" :name="icon" />
      <span v-else class="font-semibold mb-0.5"> {{ text }}</span>
      <Icon v-if="appendIcon" :name="appendIcon" />
    </template>
  </button>
</template>
<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
export interface ButtonComponentType {
  text?: string;
  disabled?: boolean;
  img?: string;
  outline?: boolean;
  rounded?: boolean;
  loading?: boolean;
  pressed?: boolean;
  color?: string;
  variant?: Variant;
  size?: Size;
  prependIcon?: string;
  appendIcon?: string;
  icon?: string;
}
const props = withDefaults(defineProps<ButtonComponentType>(), {
  variant: "primary",
  size: "medium",
  color: undefined,
  prependIcon: undefined,
  appendIcon: undefined,
  icon: undefined,
  text: undefined,
});

const sizeHeightPadding = () => {
  let padding = props.icon ? "p-2" : props.rounded ? "py-2 px-4" : "px-4";

  let height, width;
  switch (props.size) {
    case "x-small":
      height = "h-6 text-xs";
      width = "min-w-6";
      break;
    case "small":
      height = "h-7 text-xs";
      width = "min-w-7";

      break;
    case "medium":
      height = "h-9 text-sm";
      width = "min-w-9";
      break;
    case "large":
      height = "h-10 text-base";
      width = "min-w-10";
      padding = props.rounded ? "p-2" : "px-4";
      break;
    default:
      height = "h-9 text-sm";
      width = "min-w-9";
      break;
  }

  return props.icon ? `${height} ${width} ${padding}` : `${height} ${padding}`;
};

const variants: Record<Variant, string> = {
  blue: `bg-info text-white border border-secondary-700 hover:bg-info-600 active:bg-info-700`,
  grey: `bg-gray-100 text-gray-600 border border-gray-600 hover:bg-gray-200 active:bg-gray-300`,
  error: `bg-error text-white border border-error-700 hover:bg-error-600 active:bg-error-700`,
  text: "text-gray-600 hover:bg-gray-200 active:bg-gray-300`",
  success: `bg-success text-white border border-success-700 hover:bg-success-600 active:bg-success-700`,
  warning: `bg-warning text-white border border-warning-700 hover:bg-warning-600 active:bg-warning-700`,
  dark: `bg-gray-950 text-white border border-white hover:bg-primary-900 active:bg-primary-700`,
  secondary: `bg-gray-blue text-gray-600 border border-gray-600 hover:bg-gray-blue-100 active:bg-gray-blue-200 active:text-gray-500`,
  primary: `bg-primary text-white border border-secondary-700 hover:bg-secondary-600 active:bg-secondary-700 active:color-white active:border-secondary`,
};

const disabledVariants: Record<Variant, string> = {
  blue: `bg-info-300 text-gray-400 border`,
  grey: `bg-gray-50 text-gray-400 border`,
  error: `bg-error-300 text-gray-400 border`,
  text: "text-gray-300",
  success: `bg-success-300 text-gray-400 border`,
  warning: `bg-warning-300 text-gray-400 border`,
  dark: `bg-gray-700 text-gray-400 border border-white`,
  secondary: `bg-gray-blue-50 text-gray-300 border border-gray-300`,
  primary: `bg-gray-300 text-gray-500 border`,
};

const outlinedVariants: Record<Variant, string> = {
  blue: `border-info text-info border border-secondary-700 hover:border-info-600 active:border-info-700`,
  grey: `border-gray-100 text-gray-100 border hover:border-gray-200 active:border-gray-300`,
  error: `border-error text-error border hover:border-error-600 active:border-error-700`,
  text: "text-gray-600 hover:border-gray-200 active:border-gray-300`",
  success: `border-success text-success border hover:border-success-600 active:border-success-700`,
  warning: `border-warning text-warning border hover:border-warning-600 active:border-warning-700`,
  dark: `border-gray-950 text-gray-950 border hover:border-primary-900 active:border-primary-700`,
  secondary: `border-gray-blue text-gray-blue border hover:border-gray-blue-100 active:border-gray-blue-200 active:text-gray-500`,
  primary: `border-primary text-primary border  hover:border-secondary-600 active:border-secondary-700 active:color-white active:border-secondary`,
};

const outlinedVariants2: Record<Variant, string> = {
  blue: `border-info-300 text-info-300 border`,
  grey: `border-gray-50 text-gray-50 border`,
  error: `border-error-300 text-error-300 border`,
  text: "text-gray-300",
  success: `border-success-300 text-success-300 border`,
  warning: `border-warning-300 text-warning-300 border`,
  dark: `border-gray-700 text-gray-700 border border-white`,
  secondary: `border-gray-blue-50 text-gray-blue-50 border border-gray-300`,
  primary: `border-gray-300 text-gray-300 border`,
};
</script>
