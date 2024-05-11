<template>
  <div class="flex flex-col bg-slate-100 rounded-lg px-3 py-2">
    <div
      class="flex gap-3 py-2 w-full justify-between"
      :class="[expanded ? 'items-top' : 'items-center']"
      @click="emit('click:proposition')"
    >
      <div class="flex gap-3">
        <app-user-avatar
          class=""
          :class="[expanded ? 'w-16 h-16' : 'w-10 h-10']"
          rounded
        />
        <div class="flex flex-col h-100 justify-between">
          <span class="font-bold text-xl">{{ username }}</span>
          <span v-if="title" class="font-medium text-sm">{{ title }}</span>
          <span v-else class="font-medium text-sm">Freelancer</span>
        </div>
      </div>
      <app-chip
        v-if="statusChip"
        :variant="statusChip"
        icon="mdi:circle"
        rounded
      />
    </div>

    <app-divider />
    <div class="flex w-full justify-between">
      <div class="flex flex-col">
        <span class="text-xs text-gray-600 font-medium">Offer</span>
        <users-description
          type="number"
          :no-edit="noEdit"
          :value="offer"
          name="offer"
          append-text="$"
          :schema="budgetRules.budget"
          value-styling="text-sm font-semibold"
          items-center
        />
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
import type { PROPOSITION_STATUS } from "~/models/proposition.model";

export interface PropositionCardComponentType {
  username: string;
  offer: number;
  description: string;
  title: string | null;
  days: number;
  expanded?: boolean;
  status?: PROPOSITION_STATUS;
  noEdit?: boolean;
}

const emit = defineEmits(["click:proposition"]);

const props = withDefaults(defineProps<PropositionCardComponentType>(), {
  status: 0,
  title: null,
});

const { budgetRules } = useFormRules();

const statusChip = computed<Variant | null>(() => {
  switch (props.status) {
    case 0:
      return null;
    case 1:
      return "error";
    case 2:
    case 3:
    case 4:
      return "warning";
    case 5:
    case 6:
      return "success";
    case 7:
      return "secondary";
    default:
      return null;
  }
});
</script>
