<template>
  <div class="flex flex-col bg-slate-100 rounded-lg px-3 py-2">
    <div
      class="flex gap-3 py-2"
      :class="[expanded ? 'items-top' : 'items-center']"
      @click="emit('click:proposition')"
    >
      <app-user-avatar
        class=""
        :class="[expanded ? 'w-16 h-16' : 'w-10 h-10']"
        rounded
      />
      <div class="flex flex-col h-100 justify-between">
        <span class="font-bold text-xl">{{ username }}</span>
        <span class="font-medium text-sm">Freelancer</span>
      </div>
    </div>

    <app-divider />
    <div class="flex w-full justify-between">
      <div class="flex flex-col">
        <span class="text-xs text-gray-600 font-medium">Offer</span>
        <span class="text-sm font-semibold">{{ offer }}$</span>
      </div>
      <div v-if="expanded" class="flex flex-col">
        <span class="text-xs text-gray-600 font-medium"
          >Estimated duration</span
        >
        <span class="text-sm font-semibold">{{ days }} days</span>
      </div>
    </div>
    <div v-if="expanded">
      <app-divider />
      <div class="">
        <span class="font-light text-sm text-black">{{ description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface PropositionCardComponentType {
  username: string;
  offer: number;
  description: string;
  days: number;
  expanded?: boolean;
  status?: number;
}

const emit = defineEmits(["click:proposition"]);

withDefaults(defineProps<PropositionCardComponentType>(), {
  status: 0,
});
</script>
