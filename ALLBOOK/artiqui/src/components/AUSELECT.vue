<template>
  <div class="au-select-wrapper">
    <select
      v-model="selectedValue"
      :class="['au-select', `au-select--${variant}`, { 'au-select--disabled': disabled }]"
      :disabled="disabled"
      @change="handleChange"
    >
      <option v-if="placeholder" :value="null" disabled selected>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'AUSELECT',
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
    placeholder: {
      type: String,
      default: 'Select an option',
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
  },
  data() {
    return {
      selectedValue: this.modelValue,
    };
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
    handleChange() {
      this.$emit('change', this.selectedValue);
    },
  },
};
</script>
