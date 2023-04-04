<template>
  <gModal @close="closeFN" :isOpen="isOpen" type="full" :showCloseButton="true">
    <ion-page>
      <ion-header mode="ios" class="ion-no-border">
        <gNav borderless :showBackButton="false" :title="title" class="mt-4">
        </gNav>

        <div class="mx-2 -mb-2">
          <gSearch v-model="searchText" />
        </div>
      </ion-header>
      <ion-content fullscreen class="ion-padding">
        <div v-if="showCurrentLocation" class="mb-8">
          <gButton @click="closeFN" fill="outline" block appendIcon="navigate"
            >User current location</gButton
          >
        </div>

        <div v-if="searchText" class="flex flex-col">
          <div
            @click="closeFN"
            v-for="(item, i) in 4"
            :key="i"
            class="ion-activatable relative overflow-hidden last:border-0 border-b border-dark-50"
          >
            <div class="flex items-center gap-4 py-4">
              <div
                class="w-9 h-9 p-2 rounded-full bg-background flex items-center justify-center"
              >
                <ion-icon
                  class="text-xl"
                  :icon="navigate"
                  color="primary"
                ></ion-icon>
              </div>
              <div class="flex flex-col">
                <span class="font-medium text-base text-dark-300">
                  {{ searchText }}
                </span>
                <span class="text-dark-200 text-xs">Bayelsa</span>
              </div>
            </div>

            <ion-ripple-effect
              type="unbounded"
              class="text-primary-light"
            ></ion-ripple-effect>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </gModal>
</template>

<script setup>
import { IonPage, IonContent, IonIcon, IonRippleEffect } from "@ionic/vue";
import { navigate } from "ionicons/icons";
import { ref } from "vue";

defineProps({
  title: {
    type: String,
    default: "Delivery address",
  },

  isOpen: {
    type: Boolean,
    default: false,
  },

  showCurrentLocation: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["close", "address"]);

const searchText = ref("");

const closeFN = () => {
  emit("address", searchText.value);
  emit("close");
};
</script>

<style></style>
