<template>
  <ion-modal
    v-if="type == 'sheet'"
    :is-open="isOpen"
    :class="`${persistence ? 'persistence' : ''} ${
      noBackDrop ? 'noBackDrop' : ''
    } `"
    :initial-breakpoint="initialBreakpoint"
    :breakpoints="breakPoints"
    @ionModalDidDismiss="$emit('close')"
    :backdrop-dismiss="backdropDismiss"
    :backdrop-breakpoint="Number(backdropBreakpoint)"
    class="sheet"
    :can-dismiss="canDismiss"
  >
    <div class="relative w-full"></div>
    <gNav
      borderless
      :title="title"
      :showBackButton="false"
      v-if="!noHeader"
      class="my-2"
    >
      <ion-buttons
        v-if="showCloseButton"
        :slot="closeButtonDirection === 'left' ? 'start' : 'end'"
      >
        <ion-button>
          <div
            @click="$emit('close')"
            style=""
            :class="`${closeButtonDark ? 'bg-dark' : 'bg-light'} `"
            class="h-8 w-8 flex items-center justify-center rounded-full p-1"
          >
            <ion-icon
              :class="closeButtonDark ? ' text-white' : ' text-dark-400'"
              class="text-2xl"
              slot="icon-only"
              :icon="close"
            ></ion-icon>
          </div>
        </ion-button>
      </ion-buttons>
    </gNav>
    <ion-content :class="spacing ? 'ion-padding' : ''">
      <slot />
    </ion-content>
  </ion-modal>
  <ion-modal
    v-else
    :is-open="isOpen"
    :class="`${persistence ? 'persistence' : ''} ${
      noBackDrop ? 'noBackDrop' : ''
    }${type == 'full' ? 'full' : 'custom'}`"
    @ionModalDidDismiss="$emit('close')"
  >
    <gNav
      :title="title"
      borderless
      :color="color"
      :showBackButton="false"
      v-if="!noHeader"
      class="my-2"
    >
      <ion-buttons
        v-if="showCloseButton"
        :slot="closeButtonDirection === 'left' ? 'start' : 'end'"
      >
        <ion-button>
          <div
            @click="$emit('close')"
            style=""
            :class="`${closeButtonDark ? 'bg-dark' : 'bg-light'} `"
            class="h-8 w-8 flex items-center justify-center rounded-full p-1"
          >
            <ion-icon
              :class="closeButtonDark ? ' text-white' : ' text-dark-400'"
              class="text-2xl"
              slot="icon-only"
              :icon="close"
            ></ion-icon>
          </div>
        </ion-button>
      </ion-buttons>
    </gNav>
    <ion-content :class="spacing ? 'ion-padding' : ''">
      <slot />
    </ion-content>
  </ion-modal>
</template>

<script setup>
import {
  IonModal,
  IonIcon,
  IonContent,
  IonButtons,
  IonButton,
} from "@ionic/vue";
import { close } from "ionicons/icons";

defineProps({
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
  noHeader: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  closeButtonDirection: {
    type: String,
    default: "right",
  },
  color: {
    type: String,
    default: "transparent",
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
    type: Array,
    default: () => [0, 0.25, 0.5, 0.75],
  },
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
