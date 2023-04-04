<template>
  <div class="relative" :class="error ? 'mb-4' : ''">
    <ion-item ref="area" class="area border">
      <ion-textarea
        @ionBlur="markTouched"
        @ionFocus="inputFocus = true"
        @ionInput="$emit('update:modelValue', $event.target.value)"
        :autoGrow="autoGrow"
        :disabled="disabled"
        :required="required"
        :readonly="readonly"
        :inputmode="inputmode"
        :maxlength="maxlength"
        :minlength="minlength"
        :spellcheck="spellcheck"
        :placeholder="placeholder"
        :wrap="wrap"
        :cols="cols"
        :rows="rows"
      >
      </ion-textarea>
    </ion-item>
    <div
      v-if="error"
      class="absolute text-xs font-medium text-error mt-1 left-2"
    >
      {{ error }}
    </div>

    <div
      class="borderClassArea pointer-events-none absolute top-0 left-0 w-full h-full p-4 z-10"
    ></div>

    <div
      v-if="label"
      :class="labelStyle"
      class="labelClassArea absolute z-10 pointer-events-none"
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
import { IonItem, IonTextarea } from "@ionic/vue";
import { computed, ref } from "vue";

export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    color: {
      type: [String, Boolean],
      default: "primary",
    },

    placeholder: {
      type: String,
      default: "",
    },
    inputmode: {
      type: String,
      default: "text",
    },
    maxlength: {
      type: Number,
      default: undefined,
    },
    minlength: {
      type: Number,
      default: undefined,
    },
    wrap: {
      type: String,
      default: undefined,
    },
    cols: {
      type: Number,
      default: undefined,
    },
    rows: {
      type: Number,
      default: 4,
    },
    disabled: {
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
    autoGrow: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    error: {
      type: [String, Boolean],
      default: false,
    },
    label: {
      type: [String, Boolean],
      default: "",
    },
  },

  components: {
    IonItem,
    IonTextarea,
  },

  setup(props) {
    const inputFocus = ref("");

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
          : `var(--ion-color-medium)`;
      }
    });

    const labelStyle = computed(() => {
      let style;

      if (props.appendIcon) {
        if (inputFocus.value) {
          style = "left-9 -top-3 p-1 text-sm ";
        } else {
          if (String(props.modelValue).trim() === "") {
            style = "left-11 top-5 transform -translate-y-1/2";
          } else {
            style = "left-11 -top-3 p-1 text-sm ";
          }
        }
      } else {
        if (inputFocus.value) {
          style = "left-4 -top-3 p-1 text-sm ";
        } else {
          if (String(props.modelValue).trim() === "") {
            style = "left-4 top-5";
          } else {
            style = "left-4 -top-3 p-1 text-sm ";
          }
        }
      }

      return style;
    });

    return {
      colorName,
      inputFocus,
      labelStyle,
    };
  },
  computed: {},
  methods: {
    markTouched() {
      if (this.modelValue.trim() === "") {
        this.inputFocus = false;
      }

      this.$refs.area.$el.classList.add("ion-touched");
    },
  },
};
</script>

<style scope>
.labelClassArea {
  transition: top, font-size, 0.1s ease-in-out;
  /* background-color: var(--ion-color-white); */
  color: v-bind(colorName);
}

.borderClassArea {
  border: 1.5px solid v-bind(colorName) !important;
  border-radius: 16px !important;
}

ion-item.area {
  /* padding: 0 !important; */
  /* border: 1.5px solid v-bind(colorName) !important;
  border-radius: 12px !important; */
  border: none !important;
  border-radius: 16px !important;
}

ion-textarea {
  --border-color: v-bind(colorName);
}

.item-has-focus {
  --highlight-background: #ffffff;
  --border-color: #ffffff;
}
</style>
