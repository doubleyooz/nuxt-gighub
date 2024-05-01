<template>
  <div class="grid xs:grid-cols-2 h-full">
    <div class="hidden xs:flex w-full bg-primary-800" />
    <custom-card
      title="login"
      :img="{ src: 'logo.png', height: 100, width: 100, alt: 'gighub' }"
    >
      <template #content>
        <form
          ref="form"
          class="flex flex-col gap-2 mb-4"
          @submit.prevent="submit"
        >
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

          <inputs-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Repeat the password"
            :schema="passwordRules.confirmPassword"
            type="password"
            @is:valid="(x) => (isValidPassword = x)"
          />
        </form>

        <custom-button
          class="w-full"
          text="Sign up"
          :disabled="disableButton"
          :loading="loading"
        />
      </template>
    </custom-card>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";

definePageMeta({
  layout: "auth",
});
const router = useRouter();
const route = useRoute();
const { emailRules, passwordRules } = useFormRules();

const redirect =
  (route.query.redirect as string) || useCookie("redirect").value;

const hasError = ref(false);
const errorMessage = ref("");

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const isValidEmail = ref(true);
const isValidPassword = ref(true);
const loading = ref(false);

const disableButton = computed(
  () =>
    !(isValidEmail.value && isValidPassword.value) ||
    email.value === "" ||
    password.value === ""
);

const { handleSubmit, errors, values, controlledValues } = useForm({
  validationSchema: { ...emailRules, ...passwordRules },
  keepValuesOnUnmount: true,
});

const submit = handleSubmit(async () => {
  loading.value = true;

  try {
    await useFetch("login", {});
    if (redirect) {
      router.push(redirect);
      useCookie("redirect").value = null;
    } else {
      router.push("/");
    }
  } catch (err: unknown) {
    hasError.value = true;
    console.log(err);
  } finally {
    loading.value = false;
    setTimeout(() => {
      hasError.value = false;
    }, 5000);
  }
});
</script>
