
<template>
  <div class="au-multiselect-wrapper">
    <div
      class="au-multiselect"
      :class="{ 'au-multiselect--disabled': disabled }"
      @click="toggleDropdown"
    >
      <span v-if="selectedValues.length === 0" class="au-multiselect__placeholder">
        {{ placeholder }}
      </span>
      <span v-else class="au-multiselect__selected">
        {{ selectedValues.map((val) => options.find((opt) => opt.value === val).label).join(', ') }}
      </span>
    </div>
    <div v-if="isOpen" class="au-multiselect__dropdown">
      <div
        v-for="option in options"
        :key="option.value"
        class="au-multiselect__option"
        @click="toggleOption(option.value)"
      >
        <input
          type="checkbox"
          :checked="selectedValues.includes(option.value)"
          class="au-multiselect__checkbox"
          readonly
        />
        <span>{{ option.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AUMULTISELECT',
  props: {
    options: {
      type: Array,
      required: true,
      validator: (opts) => opts.every((opt) => 'value' in opt && 'label' in opt),
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: 'Select options',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedValues: this.modelValue,
      isOpen: false,
    };
  },
  watch: {
    modelValue(newVal) {
      this.selectedValues = newVal;
    },
    selectedValues(newVal) {
      this.$emit('update:modelValue', newVal);
      this.$emit('change', newVal);
    },
  },
  methods: {
    toggleDropdown() {
      if (!this.disabled) {
        this.isOpen = !this.isOpen;
      }
    },
    toggleOption(value) {
      if (this.selectedValues.includes(value)) {
        this.selectedValues = this.selectedValues.filter((val) => val !== value);
      } else {
        this.selectedValues = [...this.selectedValues, value];
      }
    },
  },
};
</script>

