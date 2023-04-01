<template>
  <ion-searchbar
    clear-icon="close"
    :search-icon="allIcons[icon]"
    :value="modelValue"
    :placeholder="placeholder"
    @ionInput="$emit('update:modelValue', $event.target.value)"
    :debounce="debounce"
    @ionChange="$emit('handleChange', $event)"
    class="custom"
    :readonly="readonly"
    :disabled="disabled"
    :inputmode="inputmode"
    :show-clear-button="showClearButton"
    :type="type"
    mode="ios"
  ></ion-searchbar>
</template>

<script setup>
import { IonSearchbar } from "@ionic/vue";

import * as allIcons from "ionicons/icons";
import { addIcons } from "ionicons";
import { onMounted } from "vue";

defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  debounce: {
    type: Number,
    default: undefined,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  clearInput: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showClearButton: {
    type: String,
    default: "focus",
  },

  icon: {
    type: String,
    default: undefined,
  },

  placeholder: {
    type: String,
    default: "Enter new address",
  },

  inputmode: {
    type: String,
    default: "search",
  },

  type: {
    type: String,
    default: "search",
  },

  autocomplete: {
    type: String,
    default: "off",
  },
  autocorrect: {
    type: String,
    default: "off",
  },
  color: {
    type: [String, Boolean],
    default: "primary",
  },
});

defineEmits("handleChange");

onMounted(() => {
  addIcons(allIcons);
});
</script>

<style scope>
ion-searchbar.custom {
  /* --border-radius: 10px; */
}
</style>
