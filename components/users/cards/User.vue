<template>
  <div class="pt-8 hover:bg-slate-100">
    <div class="px-4">
      <div class="flex">
        <app-user-avatar
          class="h-16 w-16 mr-4 cursor-pointer"
          :src="profilePicture"
          rounded
          show-border
          @click:avatar="emit('click')"
        />
        <div class="flex flex-col">
          <span
            class="text-base leading-5 h-5 cursor-pointer hover:text-primary-500 hover:underline hover:decoration-primary-500"
            @click="emit('click')"
            >{{ name }}</span
          >
          <span
            class="text-xl leading-5 cursor-pointer hover:text-primary-500 hover:underline hover:decoration-primary-500"
            @click="emit('click')"
            >{{ title }}</span
          >
        </div>
      </div>
      <users-description :value="description" no-edit />
    </div>
    <app-divider class="pt-8" overwrite-margin />
  </div>
</template>
<script setup lang="ts">
export interface UserCardComponentType {
  description: string;
  name: string;
  title?: string;
  profilePicture?: string;
}

withDefaults(defineProps<UserCardComponentType>(), {
  profilePicture: undefined,
  title: "A hard working freelancer",
});

const emit = defineEmits(["click"]);
</script>
