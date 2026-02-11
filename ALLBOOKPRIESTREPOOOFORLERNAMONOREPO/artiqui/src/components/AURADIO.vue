```vue
<template>
  <div>
    <div v-for="(option, index) in options" :key="index" class="d-flex flex-row mb-2">
      <div>
        <input
          type="radio"
          :id="`radio-${index}`"
          :value="option.value"
          v-model="selectedValue"
          :name="radioGroupName"
          :class="{
            'au-radio': true,
            'au-radio--checked': selectedValue === option.value,
            'au-radio--disabled': disabled,
          }"
          :disabled="disabled"
          @change="handleRadioChange"
        />
      </div>
      <label :for="`radio-${index}`" class="au-radio__label">{{ option.label }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AURADIO',
  props: {
    options: {
      type: Array,
      required: true,
      validator: (opts) => opts.every((opt) => 'value' in opt && 'label' in opt),
    },
    modelValue: {
      type: [String, Number],
      default: null,
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (val) => ['primary', 'secondary', 'outline'].includes(val),
    },
    size: {
      type: String,
      default: 'medium',
      validator: (val) => ['small', 'medium', 'large'].includes(val),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: 'radio-group',
    },
  },
  data() {
    return {
      selectedValue: this.modelValue,
    };
  },
  computed: {
    radioGroupName() {
      return this.name;
    },
  },
  watch: {
    modelValue(newVal) {
      this.selectedValue = newVal;
    },
    selectedValue(newVal) {
      this.$emit('update:modelValue', newVal);
      this.$emit('change', newVal);
    },
  },
  methods: {
    handleRadioChange() {
      this.$emit('change', this.selectedValue);
    },
  },
};
</script>

