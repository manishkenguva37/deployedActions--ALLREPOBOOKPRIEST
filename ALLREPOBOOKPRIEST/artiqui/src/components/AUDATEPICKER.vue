```vue
<template>
  <div class="au-datepicker-wrapper">
    <input
      ref="datepicker"
      type="text"
      :class="[
        'au-datepicker',
        `au-datepicker--${variant}`,
        { 'au-datepicker--disabled': disabled },
      ]"
      :placeholder="placeholder"
      :disabled="disabled"
      v-model="formattedDate"
      @focus="openPicker"
    />
    <div v-if="showShortcuts" class="au-datepicker__shortcuts">
      <button
        v-for="shortcut in shortcuts"
        :key="shortcut.label"
        class="au-datepicker__shortcut"
        @click="applyShortcut(shortcut)"
      >
        {{ shortcut.label }}
      </button>
    </div>
  </div>
</template>

<script>
import flatpickr from 'flatpickr';


export default {
  name: 'AUDATEPICKER',
  props: {
    modelValue: {
      type: [String, Array, Date],
      default: null,
    },
    mode: {
      type: String,
      default: 'single',
      validator: (val) => ['single', 'range', 'multiple'].includes(val),
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
    minDate: {
      type: String,
      default: null,
    },
    maxDate: {
      type: String,
      default: null,
    },
    disabledDates: {
      type: Array,
      default: () => [],
    },
    restrictPastDates: {
      type: [Boolean, String],
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Select date',
    },
    showShortcuts: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      formattedDate: null,
      picker: null,
      shortcuts: [
        { label: 'Today', value: () => new Date() },
        {
          label: 'Yesterday',
          value: () => {
            const date = new Date();
            date.setDate(date.getDate() - 1);
            return date;
          },
        },
        {
          label: 'Last Week',
          value: () => {
            const date = new Date();
            date.setDate(date.getDate() - 7);
            return date;
          },
        },
      ],
    };
  },
  computed: {
    effectiveMinDate() {
      if (this.restrictPastDates) {
        if (typeof this.restrictPastDates === 'string') {
          return this.restrictPastDates; // Custom date
        }
        // Restrict to today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today.toISOString().split('T')[0];
      }
      return this.minDate;
    },
  },
  watch: {
    modelValue(newVal) {
      this.updateFormattedDate(newVal);
    },
    effectiveMinDate() {
      this.updatePickerConfig();
    },
    minDate() {
      this.updatePickerConfig();
    },
    maxDate() {
      this.updatePickerConfig();
    },
    disabledDates() {
      this.updatePickerConfig();
    },
  },
  mounted() {
    this.initializeFlatpickr();
  },
  beforeDestroy() {
    if (this.picker) {
      this.picker.destroy();
    }
  },
  methods: {
    initializeFlatpickr() {
      this.picker = flatpickr(this.$refs.datepicker, {
        mode: this.mode,
        minDate: this.effectiveMinDate,
        maxDate: this.maxDate,
        disable: this.disabledDates,
        dateFormat: 'Y-m-d',
        onChange: (selectedDates) => {
          this.$emit('update:modelValue', this.mode === 'single' ? selectedDates[0] : selectedDates);
          this.$emit('change', this.mode === 'single' ? selectedDates[0] : selectedDates);
        },
      });
      this.updateFormattedDate(this.modelValue);
    },
    updatePickerConfig() {
      if (this.picker) {
        this.picker.set('minDate', this.effectiveMinDate);
        this.picker.set('maxDate', this.maxDate);
        this.picker.set('disable', this.disabledDates);
      }
    },
    updateFormattedDate(value) {
      if (!value) {
        this.formattedDate = null;
        return;
      }
      if (this.mode === 'single') {
        this.formattedDate = value instanceof Date ? this.picker.formatDate(value, 'Y-m-d') : value;
      } else {
        this.formattedDate = Array.isArray(value)
          ? value.map((date) => this.picker.formatDate(new Date(date), 'Y-m-d')).join(' to ')
          : value;
      }
    },
    openPicker() {
      if (!this.disabled && this.picker) {
        this.picker.open();
      }
    },
    applyShortcut(shortcut) {
      const value = shortcut.value();
      this.picker.setDate(value);
      this.$emit('update:modelValue', this.mode === 'single' ? value : [value]);
      this.$emit('change', this.mode === 'single' ? value : [value]);
    },
  },
};
</script>

