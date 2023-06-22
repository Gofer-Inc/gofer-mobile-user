<template>
  <ion-page>
    <gNav title="Forgot Password" :onClick="handleBackButton" />

    <ion-content fullscreen>
      <!-- //// Step 1 ///// -->
      <div v-if="step === 'email'" class="ion-padding flex flex-col gap-4">
        <div class="pb-2 text-center">
          <h2 class="text-2xl text-dark-400">Reset Password</h2>
          <p class="mt-1 text-sm text-dark-200">
            Enter your registered email and we will send you a reset
            instructionss
          </p>
        </div>

        <form
          autocomplete="on"
          @submit.prevent="sendOtp"
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
          <h2 class="text-2xl text-dark-400">OTP Code</h2>
          <p class="mt-1 text-sm text-dark-200">
            Enter the 4-Digit code sent to you at
            <span class="font-medium">{{ args.email }}</span>
          </p>
        </div>

        <div class="mx-auto w-full">
          <gOtp @input="args.code = $event" :error="errorRules.otp" />
        </div>

        <div class="text-center text-xs text-dark-200">
          Didn’t receive code?
          <span class="font-medium text-primary">Resend Code</span>
        </div>
      </div>

      <!-- //// Step 2 ///// -->
      <div v-if="step === 'password'" class="ion-padding flex flex-col gap-4">
        <div class="pb-2 text-center">
          <h2 class="text-2xl text-dark-400">Change Password</h2>
          <p class="mt-1 text-sm text-dark-200">
            Enter a new an secure password
          </p>
        </div>

        <form
          autocomplete="on"
          @submit.prevent="resetPassword"
          class="flex flex-col gap-2"
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
        </form>
      </div>
    </ion-content>

    <gFooter>
      <div class="ion-padding mb-4 grid grid-cols-1 gap-3">
        <gButton
          :disabled="step == 'otp' && args.code.length !== 4"
          @click="handleButtonClick"
          :loading="loading"
          block
        >
          {{ buttonTitle }}
        </gButton>
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
import { helperFunctions } from "@/composable/helperFunctions";
import { useRouter } from "vue-router";
import { inject } from "vue";

const http = inject("http");
const { validateEmail, showToast } = helperFunctions;
const router = useRouter();

const loading = ref(false);
const showPassword = ref(false);
const step = ref("email");
const buttonTitle = ref("Reset Password");

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

const handleButtonClick = () => {
  if (step.value == "email") {
    sendOtp();
  } else if (step.value == "otp") {
    verifyOtp();
  } else if (step.value == "password") {
    resetPassword();
  }
};

const handleBackButton = () => {
  if (step.value == "email") {
    router.go(-1);
  } else {
    step.value = step.value == "password" ? "otp" : "email";
    buttonTitle.value =
      step.value == "password" ? "Continue" : "Reset Password";
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
      buttonTitle.value = "Continue";
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
      showToast("success", "Password successfully updated");
      router.push({ name: "Login" });
      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  }
};

const verifyOtp = () => {
  step.value = "password";
  buttonTitle.value = "Create Password";
};

const goBack = () => {
  step.value = step.value == "password" ? "otp" : "email";
};
</script>

<style></style>
