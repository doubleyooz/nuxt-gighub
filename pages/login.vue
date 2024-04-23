<template>
  <div class="grid xs:grid-cols-2 h-full">
    <div class="hidden xs:flex w-full bg-primary-800" />
    <custom-card
      title="login"
      :img="{ src: 'logo.png', height: 100, width: 100, alt: 'gighub' }"
    >
      <template #content>
        <div class="flex flex-col gap-2 mb-4">
          <inputs-text-field
            v-model="email"
            label="Email"
            name="email"
            :schema="emailRules.email"
            @is:valid="(x) => (isValidEmail = x)"
          />
          <inputs-text-field
            v-model="password"
            label="Password"
            name="password"
            :schema="passwordRules.password"
            type="password"
            @is:valid="(x) => (isValidPassword = x)"
          />
        </div>

        <custom-button class="w-full" text="Login" :disabled="disableButton" />
      </template>
    </custom-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const { emailRules, passwordRules } = useFormRules();
const email = ref("");
const password = ref("");

const isValidEmail = ref(true);
const isValidPassword = ref(true);

const disableButton = computed(
  () =>
    !(isValidEmail.value && isValidPassword.value) ||
    email.value === "" ||
    password.value === ""
);
</script>
