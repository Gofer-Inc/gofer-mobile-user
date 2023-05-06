<template>
  <form
    autocomplete="on"
    @submit.prevent="submit"
    class="ion-padding flex flex-col gap-6"
  >
    <gInput
      v-model="args.email"
      label="Email"
      inputmode="email"
      type="email"
      required
      autocomplete
      :disabled="!isEdit"
      :error="errorRules.email"
    />
    <gInput
      v-model="args.firstName"
      label="First Name"
      inputmode="text"
      required
      autocomplete
      :disabled="!isEdit"
      :error="errorRules.firstName"
    />
    <gInput
      v-model="args.lastName"
      label="Last Name"
      required
      autocomplete
      :disabled="!isEdit"
      :error="errorRules.lastName"
    />
    <gInput
      v-model="args.phoneNumber"
      label="Phone Number"
      inputmode="phone"
      type="tel"
      required
      autocomplete
      :disabled="!isEdit"
      :error="errorRules.phoneNumber"
    />

    <gButton block type="submit">
      {{ isEdit ? "Save Changes" : "Edit Profile" }}
    </gButton>
  </form>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { helperFunctions } from "@/composable/helperFunctions";
import { useDataStore } from "@/stores/data";

const store = useDataStore();
const { validateEmail, processNumber } = helperFunctions;
const userDetails = computed(() => store.getUser);

console.log(userDetails.value);

const isEdit = ref(false);
const args = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
});

const errorRules = reactive({
  email: false,
  firstName: false,
  lastName: false,
  phoneNumber: false,
});

const validation = () => {
  let checkNumber =
    isNaN(args.phoneNumber.trim()) ||
    (processNumber(args.phoneNumber) &&
      processNumber(args.phoneNumber).length !== 13);

  if (args.email.trim() == "") {
    errorRules.email = "Please fill in your email";
    return false;
  } else if (!validateEmail(args.email)) {
    errorRules.email = "Email is badly formated";
    return false;
  } else if (args.firstName.trim() == "") {
    errorRules.firstName = "Please fill in your first name";
    return false;
  } else if (args.lastName.trim() == "") {
    errorRules.lastName = "Please fill in your last name";
    return false;
  } else if (args.phoneNumber.trim() == "") {
    errorRules.phoneNumber = "Please fill in your phone number";
    return false;
  } else if (checkNumber !== false) {
    errorRules.phoneNumber = "Phone number badly formatted";
    return false;
  } else {
    //Reset Error
    Object.keys(errorRules).forEach((key) => {
      errorRules[key] = false;
    });
    return true;
  }
};

function assignValues() {
  const keys = ["firstName", "lastName", "email", "phoneNumber"];
  for (let i = 0; i < keys.length; i++) {
    if (userDetails.value && userDetails.value[keys[i]]) {
      args[keys[i]] = userDetails.value[keys[i]];
    }
  }
}

assignValues();

const submit = () => {
  if (isEdit.value) {
    if (validation()) {
      console.log(args);
      isEdit.value = false;
    }
  } else {
    isEdit.value = true;
  }
};
</script>

<style></style>
