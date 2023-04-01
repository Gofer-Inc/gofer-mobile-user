<template>
  <div class="relative" :class="error ? 'mb-4' : ''">
    <ion-item ref="area">
      <ion-label v-if="label" position="stacked" class="text-heading">{{
        label
      }}</ion-label>
      <ion-textarea
        class="px-3 py-1"
        :placeholder="placeholder"
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
      default: "Type something",
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
      default: "Description",
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
          : `var(--ion-color-light-shade)`;
      }
    });

    return {
      colorName,
      inputFocus,
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
ion-textarea {
  border: 1.5px solid v-bind(colorName) !important;
  border-radius: 12px !important;
}

ion-textarea {
  --border-color: v-bind(colorName);
}

.item-has-focus {
  /* --highlight-background: #ffffff; */
  --border-color: #ffffff;
}
</style>
