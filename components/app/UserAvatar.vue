<template>
  <img
    class="transition-all duration-400 ease-in-out"
    :class="[
      showBorder ? 'border-4 border-white' : '',
      rounded ? 'rounded-full' : '',
    ]"
    src="https://randomuser.me/api/portraits/men/2.jpg"
    @click="emit('click:avatar')"
  />
</template>

<script setup lang="ts">
export interface UserAvatarComponentType {
  showBorder?: boolean;
  rounded?: boolean;
}
const emit = defineEmits(["click:avatar"]);

const props = withDefaults(defineProps<UserAvatarComponentType>(), {});
</script>
