<template>
  <ion-page>
    <gNav title="Help & Support" />
    <ion-content fullscreen>
      <div class="ion-padding">
        <div
          v-for="(link, i) in links"
          :key="i"
          class="ion-activatable last:border-none relative overflow-hidden flex items-center justify-between p-4 border-b border-outline"
        >
          <div class="flex items-center gap-4">
            <ion-icon
              :icon="link.icon"
              class="text-dark-200 text-lg"
            ></ion-icon>

            <span class="font-medium text-dark-300">
              {{ link.title }}
            </span>
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
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonRippleEffect } from "@ionic/vue";
import {
  chatbubble,
  mail,
  logoTwitter,
  call,
  chevronForward,
} from "ionicons/icons";
import { computed } from "vue";

const links = computed(() => {
  return [
    {
      title: "Live Chat",
      icon: chatbubble,
    },
    {
      title: "Email",
      icon: mail,
    },
    {
      title: "Twitter",
      icon: logoTwitter,
    },
    {
      title: "Hot Line",
      icon: call,
    },
  ];
});
</script>

<style></style>
