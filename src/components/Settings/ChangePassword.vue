<template>
  <form
    autocomplete="on"
    @submit.prevent="submit"
    class="ion-padding flex flex-col gap-6"
  >
    <gInput
      v-model="args.oldPassword"
      label="Old Password"
      :type="showPassword ? 'text' : 'password'"
      :error="errorRules.oldPassword"
      :prependIcon="showPassword ? 'eye' : 'eyeOff'"
      inputmode="password"
      required
      @prependAction="showPassword = !showPassword"
    />
    <gInput
      v-model="args.password"
      label="New Password"
      :type="showPassword ? 'text' : 'password'"
      :error="errorRules.password"
      :prependIcon="showPassword ? 'eye' : 'eyeOff'"
      inputmode="password"
      required
      @prependAction="showPassword = !showPassword"
    />
    <gInput
      v-model="args.confirmPassword"
      label="Confirm Password"
      :type="showPassword ? 'text' : 'password'"
      :error="errorRules.confirmPassword"
      :prependIcon="showPassword ? 'eye' : 'eyeOff'"
      inputmode="password"
      required
      @keyup="checkIfPasswordMatch"
      @prependAction="showPassword = !showPassword"
    />

    <gButton type="submit" block>Change Password</gButton>
  </form>
</template>

<script setup>
import { reactive, ref } from "vue";

const showPassword = ref(false);
const args = reactive({
  oldPassword: "",
  password: "",
  confirmPassword: "",
});

const errorRules = reactive({
  oldPassword: false,
  password: false,
  confirmPassword: false,
});

const checkIfPasswordMatch = () => {
  if (args.password !== args.confirmPassword) {
    errorRules.confirmPassword = "Password doesn't match";
  } else {
    errorRules.confirmPassword = false;
  }
};

const validation = () => {
  if ((args.oldPassword.trim() == "") == "") {
    errorRules.oldPassword = "Please fill in your password";
    return false;
  } else if (args.password.trim() == "") {
    errorRules.password = "Please fill in your password";
    return false;
  } else if (args.confirmPassword.trim() == "") {
    errorRules.confirmPassword = "Please confirm your password";
    return false;
  } else {
    //Reset Error
    Object.keys(errorRules).forEach((key) => {
      errorRules[key] = false;
    });
    return true;
  }
};

const submit = () => {
  if (validation()) {
    console.log(args);
  }
};
</script>

<style></style>
