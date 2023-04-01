<template>
  <gModal type="full" :isOpen="isOpen" @close="$emit('close')" showCloseButton>
    <div class="">
      <div class="text-xl font-medium">More Info</div>
      <div>
        {{ store && store.name }}
      </div>
    </div>
  </gModal>
</template>

<script setup>
defineProps({
  store: {
    type: Object,
    default: () => ({
      name: "Chicken Republic",
    }),
  },

  isOpen: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["close"]);
</script>

<style></style>
