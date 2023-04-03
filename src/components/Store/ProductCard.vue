<template>
  <div class="flex w-full text-left items-center gap-4">
    <div>
      <div
        class="w-24 h-24 border-2 border-primary-light rounded-2xl overflow-hidden"
      >
        <img
          src="@/assets/images/food-2.png"
          alt=""
          class="h-full object-cover"
        />
      </div>
    </div>
    <div class="flex flex-col gap-2 text-sm py-1">
      <div class="flex flex-col">
        <span class="text-dark-400 text-base truncate font-medium"
          >Cookie Sandwich</span
        >
        <span class="text-gray-500 text-sm"
          >Shortbread, chocolate turtle cookies, and red velvet.</span
        >
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1">
          <span class="text-sm text-gray-400 line-through">{{
            formatAmount(2000)
          }}</span>
          <span class="text-base text-primary font-medium">{{
            formatAmount(1500)
          }}</span>
        </div>
        <div
          @click="showModal = true"
          class="ion-activatable overflow-hidden relative text-xl rounded border border-grey-200 w-6 h-6 flex items-center justify-center"
        >
          <ion-icon slot="icon-only" color="primary" :icon="add"></ion-icon>
          <ion-ripple-effect class="text-primary"></ion-ripple-effect>
        </div>
      </div>
    </div>
  </div>

  <gModal
    type="full"
    :isOpen="showModal"
    @close="showModal = false"
    showCloseButton
    closeButtonDark
    closeButtonDirection="left"
    :spacing="false"
  >
    <div class="w-full h-52">
      <img
        src="@/assets/images/food-2.png"
        alt=""
        class="h-full w-full object-cover"
      />
    </div>
    <div class="ion-padding">Cookie Sandwich</div>
  </gModal>
</template>

<script setup>
import { IonIcon, IonRippleEffect } from "@ionic/vue";

import { add } from "ionicons/icons";
import { helperFunctions } from "@/composable/helperFunctions";
import { ref } from "vue";

const { formatAmount } = helperFunctions;

const showModal = ref(false);
</script>

<style></style>
