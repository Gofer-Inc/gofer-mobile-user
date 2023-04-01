<template>
  <ion-page>
    <gNav title="Search" />
    <ion-content fullscreen>
      <ExploreContainer name="Search" />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from "@ionic/vue";
//   import { chevronDown, filter, notifications } from "ionicons/icons";
import ExploreContainer from "@/components/ExploreContainer.vue";
</script>
