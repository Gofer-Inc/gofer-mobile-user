<template>
  <div class="relative" :class="error || hint ? 'mb-4' : ''">
    <ion-item ref="item" class="textInput text-heading">
      <ion-label v-if="appendIcon" class="textInput mt-4">
        <ion-icon
          class="text-xl"
          color="medium"
          :icon="allIcons[appendIcon]"
          @click="appendAction"
        ></ion-icon>
      </ion-label>
      <input
        v-if="page == 'loan'"
        :class="`${
          error
            ? 'border-error focus:border-error'
            : 'border-medium focus:border-primary focus:ring-primary'
        } ${large ? 'text-2xl font-bold' : ''}`"
        class="focus:outline-none"
        :value="formatAmount"
        :readonly="readonly"
        :inputmode="inputmode"
        :placeholder="placeholder"
        :name="name"
        :type="type"
        :required="required"
        :disabled="disabled"
        :maxlength="maxlength"
        :minlength="minlength"
        :autocomplete="autocomplete"
        :autocorrect="autocorrect"
        :autofocus="autofocus"
        @blur="inputFocus = false"
        @focus="inputFocus = true"
        @input="updateField($event)"
      />

      <ion-input
        v-else
        :value="formatAmount"
        :placeholder="placeholder"
        @ionInput="updateField($event)"
        @ionBlur="inputFocus = false"
        @ionFocus="inputFocus = true"
        :name="name"
        :type="type"
        :autocomplete="autocomplete"
        :autocorrect="autocorrect"
        :autofocus="autofocus"
        :readonly="readonly"
        :required="required"
        :spellcheck="spellcheck"
        :disabled="disabled"
        :enterkeyhint="enterkeyhint"
        :inputmode="inputmode"
        :maxlength="maxlength"
        :minlength="minlength"
        class="textInput"
      ></ion-input>

      <ion-label
        style="margin-bottom: 0px; margin-top: 0px"
        v-if="showCloseIcon"
        class="textInput"
      >
        <ion-icon
          :class="inputmode == 'search' ? 'text-2xl' : 'text-xl'"
          color="medium"
          :icon="allIcons[prependIcon]"
          @click="prependAction"
        ></ion-icon>
      </ion-label>
      <ion-label
        v-if="clearInput && modelValue.trim() !== ''"
        style="margin-bottom: 0.1px"
        class="textInput"
      >
        <ion-icon
          style="margin-top: -1px"
          class="text-2xl"
          color="primary"
          :icon="allIcons['close']"
          @click="resetField"
        ></ion-icon>
      </ion-label>
    </ion-item>

    <div
      v-if="error"
      class="absolute text-xs font-medium text-error left-1 mt-1"
    >
      {{ error }}
    </div>
    <div
      v-if="hint && !error"
      style="text-transform: none"
      class="absolute text-xs font-medium text-warning left-1 my-1"
    >
      {{ hint }}
    </div>

    <div
      class="borderClass pointer-events-none absolute top-0 left-0 w-full h-full p-4 z-10"
    ></div>

    <div
      v-if="label"
      :class="labelStyle"
      class="labelClass absolute z-10 pointer-events-none"
    >
      <div class="w-full h-full relative">
        {{ label }}
        <span
          v-if="inputFocus || modelValue"
          style="width: 110%; z-index: -2; margin-top: -4px"
          class="borderLine absolute top-1/2 -left-1 border-4 border-white"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  IonItem,
  // IonNote,
  IonLabel,
  IonIcon,
  IonInput,
} from "@ionic/vue";

import * as allIcons from "ionicons/icons";
import { addIcons } from "ionicons";
import { computed, onMounted, ref } from "vue";

export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },

    page: {
      type: String,
      default: "default",
    },
    format: {
      type: Boolean,
      default: false,
    },
    spellcheck: {
      type: Boolean,
      default: false,
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
    large: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    enterkeyhint: {
      type: [Boolean, Object, String],
      default: undefined,
    },
    maxlength: {
      type: Number,
      default: undefined,
    },
    minlength: {
      type: Number,
      default: undefined,
    },
    label: {
      type: [String, Boolean],
      default: false,
    },
    appendIcon: {
      type: [String, Boolean],
      default: false,
    },
    prependIcon: {
      type: [String, Boolean],
      default: false,
    },
    placeholder: String,
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "",
    },
    inputmode: {
      type: String,
      default: "text",
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
    helper: {
      type: [String, Boolean],
      default: false,
    },
    error: {
      type: [String, Boolean],
      default: false,
    },
    hint: {
      type: [String, Boolean],
      default: false,
    },
  },

  components: {
    IonItem,
    // IonNote,
    IonLabel,
    IonIcon,
    IonInput,
  },

  emit: ["appendAction", "prependAction"],

  setup(props) {
    const text = ref("");
    const inputFocus = ref(false);

    const showCloseIcon = computed(() => {
      let state;
      if (props.prependIcon) {
        if (props.clearInput && String(props.modelValue).trim() !== "") {
          state = false;
        } else {
          state = true;
        }
      } else {
        state = false;
      }

      return state;
    });

    const labelStyle = computed(() => {
      let style;

      if (props.appendIcon) {
        if (inputFocus.value) {
          style = "left-11 -top-3 p-1 text-sm ";
        } else {
          if (String(props.modelValue).trim() === "") {
            style = "left-11 top-1/2 transform -translate-y-1/2";
          } else {
            style = "left-11 -top-3 p-1 text-sm ";
          }
        }
      } else {
        if (inputFocus.value) {
          style = "left-4 -top-3 p-1 text-sm ";
        } else {
          if (String(props.modelValue).trim() === "") {
            style = "left-4 top-1/2 transform -translate-y-1/2";
          } else {
            style = "left-4 -top-3 p-1 text-sm ";
          }
        }
      }

      return style;
    });

    const colorName = computed(() => {
      if (props.error) {
        return inputFocus.value
          ? `var(--ion-color-danger)`
          : `var(--ion-color-danger)`;
      } else if (props.disabled) {
        return `var(--ion-color-light-shade)`;
      } else {
        return inputFocus.value
          ? `var(--ion-color-${props.color})`
          : `var(--ion-color-medium-tint)`;
      }
    });

    onMounted(() => {
      // Register all icons globally
      addIcons(allIcons);
    });

    return {
      text,
      inputFocus,
      colorName,
      labelStyle,
      allIcons,
      showCloseIcon,
    };
  },
  computed: {
    formatAmount() {
      if (this.format) {
        let val = this.modelValue;
        val = this.removeAlphabet(val);

        val = parseInt(val);
        val = val.toLocaleString();

        if (val === "NaN") {
          return "";
        } else {
          return `₦${val}`;
        }
      } else {
        return this.modelValue;
      }
    },
  },
  methods: {
    updateField(e) {
      let amount = e.target.value;

      if (this.format) {
        amount = this.removeAlphabet(amount);
        const firstChar = amount.charAt(0);
        if (firstChar === "₦") {
          amount = amount.substring(1);
        }

        if (amount !== null) {
          amount = amount.split(",").join("");
          amount = parseInt(amount);
        }
      }

      this.$emit("update:modelValue", amount);
    },

    removeAlphabet(arg) {
      arg = arg.toString();
      let regex = /[a-zA-Z]/g;
      this.$emit("update:modelValue", arg.replace(regex, ""));
      return arg.replace(regex, "");
    },

    // markTouched() {
    //   this.inputFocus = false;
    //   // if (this.modelValue.trim() === "") {
    //   // }
    //   this.$refs.item.$el.classList.add("ion-touched");
    // },

    resetField() {
      this.$emit("update:modelValue", "");
    },

    appendAction() {
      this.$emit("appendAction");
    },
    prependAction() {
      this.$emit("prependAction");
    },
  },
};
</script>

<style scope>
.labelClass {
  transition: top, font-size, 0.1s ease-in-out;
  /* background-color: var(--ion-color-white); */
  color: v-bind(colorName);
}

.borderClass {
  border: 1.5px solid v-bind(colorName) !important;
  border-radius: 12px !important;
}

ion-item.textInput {
  border: none !important;
  border-radius: 12px !important;
  --border-color: #ffffff;
  /* caret-color: var(--ion-color-medium) !important; */
  padding-top: 2px !important;
  padding-bottom: -1px !important;
}

ion-input.textInput {
  --border-color: v-bind(colorName);
  --padding-start: 0px !important;
  display: flex !important;
}

ion-item.textInput.item-has-focus {
  /* --highlight-background: #ffffff; */
  --border-color: #ffffff;
}

ion-label.textInput {
  pointer-events: all !important;
}
</style>
