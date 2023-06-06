<template>
  <ion-page>
    <gNav title="Sign in" />
    <ion-content fullscreen>
      <div class="ion-padding flex flex-col gap-4">
        <div class="text-center pb-4 pt-2">
          <h2 class="text-2xl text-dark-400">Welcome to Gofer</h2>
          <p class="text-dark-200 mt-1 text-sm">Enter your email to sign in</p>
        </div>

        <form @submit.prevent="submit" class="flex flex-col gap-6">
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

          <div class="flex flex-col gap-4">
            <gButton block fill="clear" size="small">
              <span
                class="capitalize"
                @click="$router.push({ name: 'ForgotPassword' })"
                >Forget Password?</span
              >
            </gButton>
            <gButton :loading="loading" type="submit" block>Login</gButton>
          </div>
        </form>

        <div class="text-dark-200 text-sm text-center py-4">
          Don’t have account?
          <span
            class="text-primary font-medium"
            @click="$router.push({ name: 'Register' })"
            >Register</span
          >
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  //   IonHeader,
  IonContent,
} from "@ionic/vue";
import { reactive, ref } from "vue";
import { helperFunctions } from "@/composable/helperFunctions";
import { useRouter } from "vue-router";
import { inject } from "vue";
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
