<template>
  <ion-page>
    <gNav :title="title" />
    <ion-content fullscreen class="">
      <div class="pb-4">
        <ProfileInformation v-if="$route.params.id === 'ProfileInformation'" />
        <ChangePassword v-if="$route.params.id === 'ChangePassword'" />
        <ChangeAddress v-if="$route.params.id === 'Location'" />
        <ReferralPage v-if="$route.params.id === 'Referral'" />
        <Wallet v-if="$route.params.id === 'Wallet'" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from "@ionic/vue";

import ProfileInformation from "../../components/Settings/ProfileInformation.vue";
import ChangePassword from "../../components/Settings/ChangePassword.vue";
import ChangeAddress from "../../components/Settings/ChangeAddress.vue";
import ReferralPage from "../../components/Settings/ReferralPage.vue";
import Wallet from "../../components/Settings/Wallet/WalletScreen.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const title = computed(() => {
  const id = route.params.id;
  const obj = {
    ProfileInformation: "Profile Information",
    ChangePassword: "Change Password",
    Location: "Location",
    Wallet: "Wallet",
    Referral: "Refer to Friends",
  };

  return obj[id];
});
</script>

<style></style>
