<template>
  <div class="flex flex-col">
    <inputs-text-field label="email" name="email" :schema="emailRules.email" />
    <inputs-text-field
      label="password"
      name="password"
      :schema="passwordRules.password"
    />
  </div>
</template>

<script setup lang="ts">
const { emailRules, passwordRules } = useFormRules();
</script>
