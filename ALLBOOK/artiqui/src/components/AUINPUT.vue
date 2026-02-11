<template>
  <div class="au-text-input-wrapper">
    <label v-if="label" class="au-text-input__label">{{ label }}</label>
    <div class="au-text-input__container position-relative d-flex align-items-center">
      <i v-if="icon" :class="`bi ${icon} au-text-input__icon`"></i>
      <input
        type="text"
        :class="[
          'au-text-input',
          `au-text-input--${variant}`,
          { 'au-text-input--disabled': disabled },
          { 'au-text-input--with-icon': icon },
        ]"
        :placeholder="placeholder"
        :disabled="disabled"
        v-model="inputValue"
        @input="handleInput"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AUTEXTINPUT',
  props: {
    icon: {
      type: String,
      default: null,
      validator: (val) => !val || val.startsWith('bi-'), // Ensures valid Bootstrap Icons class
    },
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (val) => ['primary', 'secondary', 'outline'].includes(val),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      inputValue: this.modelValue,
    };
  },
  watch: {
    modelValue(newVal) {
      this.inputValue = newVal;
    },
    inputValue(newVal) {
      this.$emit('update:modelValue', newVal);
    },
  },
  methods: {
    handleInput() {
      this.$emit('input', this.inputValue);
    },
    handleChange() {
      this.$emit('change', this.inputValue);
    },
  },
};
</script>

