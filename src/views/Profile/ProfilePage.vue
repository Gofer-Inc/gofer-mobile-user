<template>
  <ion-page>
    <gNav title="Profile" />
    <ion-content fullscreen>
      <ExploreContainer name="Profile" />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from "@ionic/vue";
// import { chevronDown, filter, notifications } from "ionicons/icons";
import ExploreContainer from "@/components/ExploreContainer.vue";
</script>
