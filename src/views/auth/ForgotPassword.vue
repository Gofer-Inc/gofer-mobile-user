<template>
  <ion-page>
    <gNav :showBackButton="false" title="Forgot Password">
      <ion-buttons slot="start">
        <ion-button
          fill="clear"
          @click="step == 'email' ? $router.go(-1) : goBack()"
        >
          <ion-icon
            class="text-dark-300"
            slot="icon-only"
            :icon="chevronBack"
          ></ion-icon
        ></ion-button>
      </ion-buttons>
    </gNav>
    <ion-content fullscreen>
      <!-- //// Step 1 ///// -->
      <div v-if="step === 'email'" class="ion-padding flex flex-col gap-4">
        <div class="text-center pb-4 pt-2">
          <h2 class="text-2xl text-dark-400">Reset Password</h2>
          <p class="text-dark-200 mt-1 text-sm">
            Enter your registered email and we will send you a reset
            instructionss
          </p>
        </div>

        <form
          autocomplete="on"
          @submit.prevent="sendOtp"
          class="flex flex-col gap-6"
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

          <gButton :loading="loading" type="submit" block
            >Reset Password</gButton
          >
        </form>
      </div>

      <!-- //// Step 2 ///// -->
      <div v-if="step === 'otp'" class="ion-padding flex flex-col gap-4">
        <div class="text-center pb-4 pt-2">
          <h2 class="text-2xl text-dark-400">OTP Code</h2>
          <p class="text-dark-200 mt-1 text-sm">
            Enter the 4-Digit code sent to you at
            <span class="font-medium">{{ args.email }}</span>
          </p>
        </div>

        <div class="w-full mx-auto">
          <gOtp @input="args.code = $event" :error="errorRules.otp" />
        </div>
        <gButton
          @click="verifyOtp"
          :loading="loading"
          :disabled="args.code.length !== 4"
          type="submit"
          block
          >Continue</gButton
        >

        <div class="text-dark-200 text-sm text-center py-4">
          Didn’t receive code?
          <span class="text-primary font-medium">Resend Code</span>
        </div>
      </div>

      <!-- //// Step 2 ///// -->
      <div v-if="step === 'password'" class="ion-padding flex flex-col gap-4">
        <div class="text-center pb-4 pt-2">
          <h2 class="text-2xl text-dark-400">Change Password</h2>
          <p class="text-dark-200 mt-1 text-sm">
            Enter a new an secure password
          </p>
        </div>

        <form
          autocomplete="on"
          @submit.prevent="resetPassword"
          class="flex flex-col gap-6"
        >
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

          <gButton :loading="loading" type="submit" block
            >Change Password</gButton
          >
        </form>
      </div>
    </ion-content>
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
import { helperFunctions } from "@/composable/helperFunctions";
import { useRouter } from "vue-router";
import { inject } from "vue";

const http = inject("http");
const { validateEmail, showToast } = helperFunctions;
const router = useRouter();

const loading = ref(false);
const showPassword = ref(false);
const step = ref("email");

const args = reactive({
  email: "",
  code: "",
  password: "",
  confirmPassword: "",
});

const errorRules = reactive({
  email: false,
  otp: false,
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
  if (args.email.trim() == "" && step.value == "email") {
    errorRules.email = "Please fill in your email";
    return false;
  } else if (!validateEmail(args.email) && step.value == "email") {
    errorRules.email = "Email is badly formated";
    return false;
  } else if (args.password.trim() == "" && step.value == "password") {
    errorRules.password = "Please fill in your password";
    return false;
  } else if (args.confirmPassword.trim() == "" && step.value == "password") {
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

const sendOtp = async () => {
  if (validation()) {
    loading.value = true;
    try {
      const res = await http({
        endpoint: "ForgotPassword",
        httpMethod: "post",
        body: { email: args.email },
      });

      console.log(res);
      step.value = "otp";
      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  }
};

const resetPassword = async () => {
  if (validation()) {
    loading.value = true;
    delete args.confirmPassword;
    try {
      const res = await http({
        endpoint: "ResetPassword",
        httpMethod: "post",
        body: args,
      });

      console.log(res);
      showToast("Success");
      router.push({ name: "Login" });
      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  }
};

const verifyOtp = () => {
  step.value = "password";
};

const goBack = () => {
  step.value = step.value == "password" ? "otp" : "email";
};
</script>

<style></style>
