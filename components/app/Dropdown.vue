<template>
  <div class="flex flex-col w-full">
    <div
      class="flex justify-between items-center px-6 py-4 border rounded-lg border-primary-300"
      @click="showContent = !showContent"
    >
      <span class="text-lg">
        {{ title }}
      </span>
      <Icon
        :name="showContent ? 'mdi:chevron-up' : 'mdi:chevron-down'"
        class="text-primary-500"
      />
    </div>
    <div v-if="showContent">
      <transition name="slide-fade">
        <slot name="content" />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface DropDownComponentType {
  title: string;
}

const props = withDefaults(defineProps<DropDownComponentType>(), {});
const showContent = ref(false);
</script>

<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translate3d(0, 10px, 0);
  opacity: 0;
}
</style>
