<template>
  <gModal
    type="sheet"
    :isOpen="isOpen"
    @close="$emit('close')"
    showCloseButton
    closeButtonDark
    closeButtonDirection="left"
    noHeader
    :breakPoints="[1]"
    :initialBreakpoint="1"
    :spacing="false"
  >
    <ion-page>
      <ion-content fullscreen>
        <div class="w-full h-52 relative">
          <div
            @click="$emit('close')"
            style=""
            class="absolute top-6 right-2 bg-dark h-9 w-9 flex items-center justify-center rounded-full p-1 z-50"
          >
            <ion-icon
              class="text-2xl text-white"
              slot="icon-only"
              :icon="close"
            ></ion-icon>
          </div>

          <img
            src="@/assets/images/food-2.png"
            alt=""
            class="h-full w-full object-cover"
          />
        </div>
        <div class="ion-padding text-center text-dark-400 mt-2">
          <h2 class="text-xl font-medium">Cookie Sandwich</h2>
          <p class="leading-5 mt-1 text-sm text-gray-500">
            Shortbread, chocolate turtle cookies, and red velvet. 8 ounces cream
            cheese, softened.
          </p>

          <div class="font-bold text-2xl mt-4">₦1,500</div>
        </div>

        <div class="my-4 ion-padding text-dark-200">
          Add Special Instructions
        </div>
      </ion-content>
      <gFooter>
        <div class="flex items-center justify-center gap-4 py-4">
          <span
            class="flex-shrink-0 flex items-center justify-center w-12 h-12 text-xl bg-light rounded-full text-dark-300 border border-outline"
            >-</span
          >
          <span>01</span>
          <span
            class="flex-shrink-0 flex items-center justify-center w-12 h-12 text-xl bg-light rounded-full text-dark-300 border border-outline"
            ><ion-icon :icon="add"></ion-icon
          ></span>
        </div>

        <gButton block class="my-4">Add to order (₦1,500)</gButton>
      </gFooter>
    </ion-page>
  </gModal>
</template>

<script setup>
import { IonPage, IonContent, IonIcon } from "@ionic/vue";
import { close, add } from "ionicons/icons";

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },

  data: {
    type: Object,
    default: () => ({}),
  },
});

defineEmits(["close"]);
</script>

<style></style>
