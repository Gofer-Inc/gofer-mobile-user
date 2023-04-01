<template>
  <ion-page>
    <ion-tabs @ion-tabs-did-change="setActive($event)">
      <ion-router-outlet></ion-router-outlet>

      <ion-tab-bar
        color="white"
        slot="bottom"
        class="bg-white border-t border-outline pt-4 pb-5"
      >
        <ion-tab-button
          v-for="tab in tabs"
          :key="tab.label"
          :tab="tab.tab"
          :href="tab.href"
          @click="$router.push(tab.href)"
        >
          <img
            v-if="$route.path.includes(tab.tab)"
            class="mb-1"
            :class="`${
              tab.tab == 'home' || tab.tab == 'search' ? 'w-5' : 'w-4'
            } ${tab.tab == 'home' ? '-ml-1' : ''}`"
            :src="tab.activeICon"
            :alt="tab.tab"
          />
          <img v-else class="w-4 mb-1" :src="tab.icon" :alt="tab.tab" />

          <ion-label
            :class="$route.path.includes(tab.tab) ? 'text-primary' : ''"
            >{{ tab.label }}</ion-label
          >
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  // IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";

import home from "@/assets/icon/homeTab.svg";
import homeActive from "@/assets/icon/homeTabActive.svg";
import search from "@/assets/icon/searchTab.svg";
import searchActive from "@/assets/icon/searchTabActive.svg";
import orders from "@/assets/icon/ordersTab.svg";
import ordersActive from "@/assets/icon/ordersTabActive.svg";
import profile from "@/assets/icon/profileTab.svg";
import profileActive from "@/assets/icon/profileTabActive.svg";

import { reactive, ref } from "vue";

const active = ref("home");

const setActive = (e) => {
  console.log(e);
  active.value = e.tab;
};

const tabs = reactive([
  {
    tab: "store",
    href: "/store",
    label: "Home",
    icon: home,
    activeICon: homeActive,
  },
  {
    tab: "search",
    href: "/search",
    label: "Search",
    icon: search,
    activeICon: searchActive,
  },
  {
    tab: "orders",
    href: "/orders",

    label: "Orders",
    icon: orders,
    activeICon: ordersActive,
  },
  {
    tab: "profile",
    href: "/profile",

    label: "Profile",
    icon: profile,
    activeICon: profileActive,
  },
]);
</script>

<style scoped>
ion-tab-bar.custom {
}
</style>
