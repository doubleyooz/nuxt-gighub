<template>
    <div class="flex gap-2">
        <span v-if="skills.length === 0 && !hideEmpty">{{ noSkillsPlaceholder }}</span>
        <app-chip v-for="(item, index) in skills" v-else :key="index" :text="item.title" variant="grey"
            :closeable="canEdit" @click:close="emit('remove:skill')" />
    </div>

</template>

<script setup lang="ts">
import type { PartialSkill, Skill } from "~/models/skill.model";

export interface SkillsComponentType {
    data?: Skill[];
    canEdit?: boolean;
    noSkillsPlaceholder?: string;
    hideEmpty?: boolean;
}

const props = withDefaults(defineProps<SkillsComponentType>(), {
    data: () => [],
    noSkillsPlaceholder: "No skills added",
});

const emit = defineEmits(["remove:skill"]);


const skills = ref<PartialSkill[]>(props.data);




</script>