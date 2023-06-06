<template>
  <ion-page>
    <gNav :showBackButton="false" empty />

    <ion-content fullscreen class="">
      <div class="flex flex-col py-4 gap-4">
        <div v-if="isLogin" class="flex flex-col gap-1 px-4">
          <span class="text-2xl font-medium text-dark-400"
            >Account Settings</span
          >
          <span class="text-sm text-dark-200 w-11/12"
            >Update your settings like notifications, payments, profile edit
            etc.</span
          >
        </div>

        <div>
          <div
            @click="handleClick(link)"
            v-for="(link, i) in links"
            :key="i"
            v-show="link.show"
            class="ion-activatable relative first:border-none overflow-hidden flex items-center justify-between p-4 border-t border-outline"
          >
            <div class="flex items-center gap-4">
              <ion-icon
                :icon="link.icon"
                class="text-dark-200 text-lg"
              ></ion-icon>

              <div class="flex flex-col">
                <span class="font-medium text-dark-300">
                  {{ link.title }}
                </span>
                <span class="text-xs text-dark-200">{{ link.sub }}</span>
              </div>
            </div>
            <ion-icon
              class="text-xl"
              :icon="chevronForward"
              color="medium"
            ></ion-icon>
            <ion-ripple-effect
              type="unbounded"
              class="text-outline"
            ></ion-ripple-effect>
          </div>

          <div
            v-if="isLogin"
            class="mb-2 mt-6 text-dark-300 font-medium text-lg px-4"
          >
            MORE
          </div>

          <div
            @click="handleClick(link)"
            v-for="(link, i) in more"
            :key="i"
            v-show="link.show"
            class="ion-activatable relative last:border-none overflow-hidden flex items-center justify-between p-4 border-b border-outline"
          >
            <div class="flex items-center gap-4">
              <ion-icon
                :icon="link.icon"
                :class="link.color ? `text-${link.color}` : 'text-dark-200'"
                class="text-lg"
              ></ion-icon>

              <div class="flex flex-col">
                <span class="font-medium text-dark-300">
                  {{ link.title }}
                </span>
                <span class="text-xs text-dark-200">{{ link.sub }}</span>
              </div>
            </div>
            <ion-icon
              class="text-xl"
              :icon="chevronForward"
              color="medium"
            ></ion-icon>
            <ion-ripple-effect
              type="unbounded"
              class="text-outline"
            ></ion-ripple-effect>
          </div>
        </div>

        <div class="px-4">
          <gButton
            block
            v-if="!isLogin"
            @click="$router.push({ name: 'Login' })"
            >Login</gButton
          >
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonIcon, IonRippleEffect } from "@ionic/vue";
import {
  person,
  lockClosed,
  book,
  shareSocial,
  location,
  card,
  help,
  logOutOutline,
  star,
  chevronForward,
} from "ionicons/icons";
import logout from "@/service/logout.js";
import { Capacitor } from "@capacitor/core";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useDataStore } from "@/stores/data";

const router = useRouter();
const store = useDataStore();

const isLogin = computed(() => store.getLogin);

const links = computed(() => {
  return [
    {
      title: "Profile Information",
      sub: "Change your account information",
      icon: person,
      params: "ProfileInformation",
      path: null,
      show: isLogin.value,
    },
    {
      title: "Change Password",
      sub: "Change your password",
      icon: lockClosed,
      params: "ChangePassword",
      show: isLogin.value,
    },
    {
      title: "Wallet",
      sub: "Manage your credit & debit cards",
      icon: card,
      params: "Wallet",
      show: isLogin.value,
    },
    {
      title: "Locations",
      sub: "Add or remove your delivery locations",
      icon: location,
      params: "Location",
      show: isLogin.value,
    },
    {
      title: "Refer to Friends",
      sub: "Get N1000 for reffering friends",
      icon: shareSocial,
      params: "Referral",
      show: isLogin.value,
    },
  ];
});

const more = computed(() => {
  return [
    {
      title: "Rate Us",
      sub: `Rate us on ${
        Capacitor.getPlatform() === "ios" ? "appstore" : "playstore"
      }`,
      icon: star,
      routeName: null,
      color: "primary",
      show: true,
    },

    {
      title: "FAQ",
      sub: "Frequently Asked Questions",
      icon: book,
      routeName: "FAQ",
      show: true,
    },
    {
      title: "Help & Support",
      sub: "Get support and feedback",
      icon: help,
      routeName: "Help",
      show: true,
    },
    {
      title: "Logout",
      sub: "",
      icon: logOutOutline,
      routeName: null,
      color: "error",
      show: isLogin.value,
    },
  ];
});

const handleClick = (link) => {
  if (link.params) {
    router.push({ name: "ViewPage", params: { id: link.params } });
  } else if (link.routeName) {
    router.push({ name: link.routeName });
  } else {
    if (link.title == "Logout") {
      logout();
    }
  }
};
</script>
