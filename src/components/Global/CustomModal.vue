<template>
  <ion-modal
    v-if="type == 'sheet'"
    :is-open="isOpen"
    :class="`${persistence ? 'persistence' : ''} ${
      noBackDrop ? 'noBackDrop' : ''
    } `"
    :initial-breakpoint="initialBreakpoint"
    :breakpoints="!breakPoints ? [initialBreakpoint] : displayBreakPoints"
    @ionModalDidDismiss="$emit('close')"
    :backdrop-dismiss="backdropDismiss"
    :backdrop-breakpoint="Number(backdropBreakpoint)"
    class="sheet"
    :can-dismiss="canDismiss"
  >
    <div class="relative w-full">
      <div
        v-if="showCloseButton"
        @click="$emit('close')"
        style=""
        :class="`${closeButtonDark ? 'bg-dark' : 'bg-light'} ${
          closeButtonDirection === 'left' ? 'left-2' : 'right-2'
        }`"
        class="absolute h-9 w-9 flex items-center justify-center rounded-full p-1 top-2 z-50"
      >
        <ion-icon
          :class="closeButtonDark ? ' text-white' : ' text-dark-400'"
          class="text-2xl"
          slot="icon-only"
          :icon="close"
        ></ion-icon>
      </div>
    </div>
    <div :class="spacing ? 'ion-padding' : ''">
      <slot />
    </div>
  </ion-modal>
  <ion-modal
    v-else
    :is-open="isOpen"
    :class="`${persistence ? 'persistence' : ''} ${
      noBackDrop ? 'noBackDrop' : ''
    }${type == 'full' ? 'full' : 'custom'}`"
    @ionModalDidDismiss="$emit('close')"
  >
    <div class="relative w-full">
      <div
        v-if="showCloseButton"
        @click="$emit('close')"
        style=""
        :class="`${closeButtonDark ? 'bg-dark' : 'bg-light'} ${
          closeButtonDirection === 'left' ? 'left-2' : 'right-2'
        }`"
        class="absolute h-9 w-9 flex items-center justify-center rounded-full p-1 top-2 z-50"
      >
        <ion-icon
          :class="closeButtonDark ? ' text-white' : ' text-dark-400'"
          class="text-2xl"
          slot="icon-only"
          :icon="close"
        ></ion-icon>
      </div>
    </div>
    <div :class="spacing ? 'ion-padding' : ''">
      <slot />
    </div>
  </ion-modal>
</template>

<script setup>
import { IonModal, IonIcon } from "@ionic/vue";
import { close } from "ionicons/icons";
import { computed } from "vue";

const props = defineProps({
  spacing: {
    type: Boolean,
    default: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  persistence: {
    type: Boolean,
    default: false,
  },
  noBackDrop: {
    type: Boolean,
    default: false,
  },
  canDismiss: {
    type: Boolean,
    default: true,
  },
  showCloseButton: {
    type: Boolean,
    default: false,
  },
  closeButtonDark: {
    type: Boolean,
    default: false,
  },
  closeButtonDirection: {
    type: String,
    default: "right",
  },
  type: {
    type: String,
    default: "modal",
  },

  initialBreakpoint: {
    type: Number,
    default: 0.75,
  },
  backdropDismiss: {
    type: Boolean,
    default: true,
  },
  backdropBreakpoint: {
    type: [Number, String],
    default: 0.5,
  },
  breakPoints: {
    type: [Number, Boolean],
    default: false,
  },
});

const displayBreakPoints = computed(() => {
  let arr = [];
  let start = 0;
  let endPoint = props.breakPoints
    ? props.breakPoints
    : props.initialBreakpoint;
  for (start; start <= parseFloat(endPoint); ) {
    arr.push(start);
    start += 0.25;
  }

  return arr;
});

defineEmits(["close"]);
</script>

<style>
ion-modal.custom {
  --width: fit-content;
  --min-width: 300px;
  --max-width: 90%;
  --height: fit-content;

  --border-radius: 24px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
  overflow: auto !important;
}

ion-modal.full {
  /* --width: fit-content;
  --min-width: 300px;
  --max-width: 90%;
  --height: fit-content; */

  overflow: auto !important;
}

ion-modal.md.sheet {
  --border-radius: 16px 16px 0 0 !important;
  overflow: auto;
}

ion-modal.noBackDrop::part(backdrop) {
  display: none;
}

ion-modal.persistence::part(backdrop) {
  pointer-events: none !important;
}

.bg-dark {
  background-color: #0000006b;
}

.bg-light {
  background-color: #ffffff6b;
}
</style>
