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

        <custom-button
          class="w-full"
          text="Login"
          :loading="loading"
          :disabled="disableButton"
          @click="submit"
        />
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

const loading = ref(false);

const disableButton = computed(
  () =>
    !(isValidEmail.value && isValidPassword.value) ||
    email.value === "" ||
    password.value === ""
);

const submit = async () => {
  loading.value = true;
  const encodedCredentials = btoa(`${email.value}:${password.value}`);

  // Set up the request options
  const requestOptions = {
    method: "POST", // or 'GET', depending on your API
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${encodedCredentials}`,
    },
    // If you need to send a body with your request, uncomment the following line
    // body: JSON.stringify({ /* your data here */ })
  };
  console.log(process);
  try {
    // Make the request to the login endpoint
    const response = await fetch(
      `${process.env.appServer}/login`,
      requestOptions
    );

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Login failed");
    }

    // If successful, you can process the response here
    const data = await response.json();
    console.log(data);

    // Redirect the user or perform other actions as needed
  } catch (error) {
    console.error("Error:", error);
    // Handle the error, e.g., show an error message to the user
  }

  loading.value = false;
};
</script>
