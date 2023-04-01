<template>
  <div
    class="fixed inset-0 flex justify-center items-center"
    style="z-index: 99"
  >
    <div class="absolute inset-0 overlay"></div>
    <div style="z-index: 100" v-if="parseInt(type) == 1" class="w-10">
      <!-- <img src="@/assets/image/loaderwhite.gif" alt="" /> -->
    </div>
    <div
      class="loader z-50 bg-white flex gap-4 flex-col items-center justify-center ion-padding py-6 rounded-2xl shadow-md"
      v-else
    >
      <div class="text-primary font-bold text-xl">
        {{ title }}
      </div>
      <div class="w-10">
        <!-- <img src="@/assets/image/loader.gif" alt="" /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
// import { IonSpinner } from "@ionic/vue";

defineProps({
  title: {
    type: String,
    default: "",
  },
  type: {
    type: [String, Number],
    default: 1,
  },
});
</script>

<style scope>
.overlay {
  opacity: 0.5;
  background: var(--ion-color-primary);
}

.loader {
  width: fit-content;
  min-width: 300px;
  max-width: 90%;
  height: fit-content;
}
</style>
