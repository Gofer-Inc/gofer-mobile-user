<template>
  <ion-page>
    <gNav title="Sign Up" :onClick="handleBackButton" />
    <ion-content fullscreen>
      <!-- //// Step 1 ///// -->
      <div v-if="step === 'email'" class="ion-padding flex flex-col gap-4">
        <div class="text-center">
          <h2 class="text-2xl text-dark-400">Create Account</h2>
          <p class="mt-2 text-center text-sm text-dark-200">
            Already have account?
            <span
              class="font-medium text-primary"
              @click="$router.push({ name: 'Login' })"
              >Login</span
            >
          </p>
        </div>

        <form
          autocomplete="on"
          @submit.prevent="signUp"
          class="flex flex-col gap-2"
        >
          <gInput
            v-model="args.email"
            label="Email"
            inputmode="email"
            type="email"
            required
            autocomplete
            :error="errorRules.email"
          />
        </form>
      </div>

      <!-- //// Step 2 ///// -->
      <div v-if="step === 'otp'" class="ion-padding flex flex-col gap-4">
        <div class="pb-2 text-center">
          <h2 class="text-2xl text-dark-400">Verify Email</h2>
          <p class="mt-1 text-sm font-medium text-dark-200">
            Enter the 4-Digit code sent to you at {{ args.email }}
          </p>
        </div>

        <div class="mx-auto w-full">
          <gOtp @input="otpCode = $event" :error="errorRules.otp" />
        </div>

        <div class="text-center text-xs text-dark-200">
          Didn’t receive code?
          <span class="font-medium text-primary">Resend Code</span>
        </div>
      </div>

      <!-- //// Step 2 ///// -->
      <div v-if="step === 'personal'" class="ion-padding flex flex-col gap-4">
        <div class="text-center">
          <h2 class="text-2xl text-dark-400">Create Account</h2>
          <!-- <p class="mt-1 text-sm text-dark-200">
            Enter your Name, Phone Number and Password for sign up.
          </p> -->
          <p class="mt-2 text-center text-sm text-dark-200">
            Already have account?
            <span
              class="font-medium text-primary"
              @click="$router.push({ name: 'Login' })"
              >Login</span
            >
          </p>
        </div>

        <form
          autocomplete="on"
          @submit.prevent="completeSignup"
          class="flex flex-col gap-2"
        >
          <gInput
            v-model="args.firstName"
            label="First Name"
            inputmode="text"
            required
            autocomplete
            :error="errorRules.firstName"
          />
          <gInput
            v-model="args.lastName"
            label="Last Name"
            required
            autocomplete
            :error="errorRules.lastName"
          />
          <gInput
            v-model="args.phoneNumber"
            label="Phone Number"
            inputmode="phone"
            type="tel"
            required
            autocomplete
            :error="errorRules.phoneNumber"
          />
          <gInput
            v-model="args.password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            :error="errorRules.password"
            :prependIcon="showPassword ? 'eye' : 'eyeOff'"
            inputmode="password"
            required
            @prependAction="showPassword = !showPassword"
          />
        </form>
      </div>
    </ion-content>

    <gFooter>
      <div class="ion-padding grid grid-cols-1 gap-3">
        <gButton
          :disabled="step == 'otp' && otpCode.length !== 4"
          @click="handleButtonClick"
          :loading="loading"
          block
        >
          {{ step == "otp" ? "Continue" : "Next" }}
        </gButton>

        <div class="mx-6 pt-2 text-center text-xs text-dark-200">
          By Signing up, you agree to our
          <span class="font-medium text-primary">Terms Conditions </span> &
          <span class="font-medium text-primary">Privacy Policy </span>
        </div>
      </div>
    </gFooter>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  //   IonHeader,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/vue";

import { chevronBack } from "ionicons/icons";

import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { helperFunctions } from "@/composable/helperFunctions";
import { inject } from "vue";
import { Preferences } from "@capacitor/preferences";

const { validateEmail, processNumber, showToast } = helperFunctions;
const router = useRouter();
const http = inject("http");

const loading = ref(false);
const showPassword = ref(false);
const step = ref("email");
const otpCode = ref("");

const args = reactive({
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  password: "",
});

const errorRules = reactive({
  email: false,
  otp: false,
  firstName: false,
  lastName: false,
  password: false,
});

const validation = () => {
  let checkNumber =
    isNaN(args.phoneNumber.trim()) ||
    (processNumber(args.phoneNumber) &&
      processNumber(args.phoneNumber).length !== 13);

  if (args.email.trim() == "" && step.value == "email") {
    errorRules.email = "Please fill in your email";
    return false;
  } else if (!validateEmail(args.email) && step.value == "email") {
    errorRules.email = "Email is badly formated";
    return false;
  } else if (args.firstName.trim() == "" && step.value == "personal") {
    errorRules.firstName = "Please fill in your first name";
    return false;
  } else if (args.lastName.trim() == "" && step.value == "personal") {
    errorRules.lastName = "Please fill in your last name";
    return false;
  } else if (args.phoneNumber.trim() == "" && step.value == "personal") {
    errorRules.phoneNumber = "Please fill in your phone number";
    return false;
  } else if (checkNumber !== false && step.value == "personal") {
    errorRules.phoneNumber = "Phone number badly formatted";
    return false;
  } else if (args.password.trim() == "" && step.value == "personal") {
    errorRules.password = "Please fill in your password";
    return false;
  } else {
    //Reset Error
    Object.keys(errorRules).forEach((key) => {
      errorRules[key] = false;
    });
    return true;
  }
};

const clearFields = () => {
  args.email = "";
  args.firstName = "";
  args.lastName = "";
  args.phoneNumber = "";
  args.password = "";
};

const handleButtonClick = () => {
  if (step.value == "email") {
    signUp();
  } else if (step.value == "otp") {
    verifyEmail();
  } else if (step.value == "personal") {
    completeSignup();
  }
};

const handleBackButton = () => {
  if (step.value == "email") {
    router.go(-1);
  } else {
    step.value = step.value == "personal" ? "otp" : "email";
  }
};

const signUp = async () => {
  if (validation()) {
    loading.value = true;
    try {
      const res = await http({
        endpoint: "SignUp",
        httpMethod: "post",
        body: { email: args.email },
        suffix: "customer",
      });

      console.log(res);
      step.value = "otp";
      loading.value = false;
    } catch (error) {
      showToast("error", error.message);
      loading.value = false;
    }
  }
};

const verifyEmail = async () => {
  if (validation()) {
    loading.value = true;
    try {
      const res = await http({
        endpoint: "VerifyEmail",
        httpMethod: "post",
        body: { email: args.email, code: otpCode.value },
      });

      console.log(res);
      step.value = "personal";
      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  }
};

const completeSignup = async () => {
  if (validation()) {
    loading.value = true;
    try {
      const res = await http({
        endpoint: "CompleteSignUp",
        httpMethod: "post",
        body: args,
        storeKey: "user",
      });

      console.log(res);
      await Preferences.set({ key: "token", value: res.token });
      router.push({ name: "Profile" });
      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  }
};
</script>

<style></style>
