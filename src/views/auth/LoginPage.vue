<template>
  <ion-page>
    <gNav title="Sign in" />
    <ion-content fullscreen>
      <div class="ion-padding -mt-2 flex flex-col gap-4">
        <div class="text-center">
          <h2 class="text-2xl text-dark-400">Welcome to Gofer</h2>
          <p class="mt-1 text-sm text-dark-200">Enter your email to sign in</p>
        </div>

        <form @submit.prevent="submit" class="flex flex-col gap-2">
          <gInput
            v-model="args.email"
            label="Email"
            :error="errorRules.email"
          />
          <gInput
            v-model="args.password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            :error="errorRules.password"
            :prependIcon="showPassword ? 'eye' : 'eyeOff'"
            @prependAction="showPassword = !showPassword"
          />

          <gButton fill="clear" size="small" class="m-0">
            <span
              class="text-xs capitalize"
              @click="$router.push({ name: 'ForgotPassword' })"
              >Forget Password?</span
            >
          </gButton>
        </form>
      </div>
    </ion-content>

    <gFooter>
      <div class="ion-padding grid grid-cols-1 gap-2">
        <gButton :loading="loading" type="submit" block>Login</gButton>
        <div class="py-4 text-center text-xs text-dark-200">
          Don’t have account?
          <span
            class="font-medium text-primary"
            @click="$router.push({ name: 'Register' })"
            >Register</span
          >
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
} from "@ionic/vue";
import { reactive, ref, inject } from "vue";
import { helperFunctions } from "@/composable/helperFunctions";
import { useRouter } from "vue-router";
import { Preferences } from "@capacitor/preferences";
import { useDataStore } from "@/stores/data";

const http = inject("http");
const router = useRouter();
const store = useDataStore();
const { validateEmail } = helperFunctions;

const showPassword = ref(false);
const loading = ref(false);

const args = reactive({
  email: "",
  password: "",
});

const errorRules = reactive({
  email: false,
  password: false,
});

const validation = () => {
  if (args.email.trim() == "") {
    errorRules.email = "Please fill in your email";
    return false;
  } else if (!validateEmail(args.email)) {
    errorRules.email = "Email is badly formated";
    return false;
  } else if (args.password.trim() == "") {
    errorRules.password = "Please enter your password";
    return false;
  } else {
    errorRules.email = false;
    errorRules.password = false;

    return true;
  }
};

const submit = async () => {
  if (validation()) {
    loading.value = true;
    try {
      const res = await http({
        endpoint: "SignIn",
        httpMethod: "post",
        body: args,
        storeKey: "user",
      });

      console.log(res);
      await Preferences.set({ key: "token", value: res.token });
      store.$patch({
        isLoggedIn: true,
      });

      router.push({ name: "Store" });
      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  }
};
</script>

<style></style>
