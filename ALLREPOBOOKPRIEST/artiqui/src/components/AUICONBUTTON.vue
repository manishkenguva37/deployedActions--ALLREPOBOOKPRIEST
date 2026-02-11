<template>
  <div class="mb-3 au-icon-input">
    <label
      v-if="label"
      :for="inputId"
      class="form-label visually-hidden"
    >
      {{ label }}
    </label>

    <div class="input-group has-validation">
      <span class="input-group-text">
        <i :class="icon"></i>
      </span>

      <input
        :id="inputId"
        type="text"
        size="5"
        :inputmode="inputMode"
        :pattern="pattern"
        :placeholder="placeholder"
        v-model="inputValue"
        :class="['form-control form-control-lg', { 'is-invalid': invalid }]"
        @input="handleInput"
        @blur="inputValueTouched = true"
      />

      <div class="invalid-feedback">
        Please enter a valid {{ label || 'value' }}.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AUIconInput',
  props: {
    icon: { type: String, required: true },
    placeholder: { type: String, default: '' },
    label: { type: String, default: null },
    type: { type: String, default: 'text' }, // 'text' or 'numeric'
    invalid: { type: Boolean, default: false }
  },
  data() {
    return {
      inputValue: '',
      inputValueTouched: false
    };
  },
  computed: {
    inputId() {
      return `input-${this._uid}`;
    },
    inputMode() {
      return this.type === 'numeric' ? 'numeric' : 'text';
    },
    pattern() {
      return this.type === 'numeric' ? '[0-9]*' : null;
    }
  },
  methods: {
    handleInput(event) {
      const raw = event.target.value;
      this.inputValue =
        this.type === 'numeric' ? raw.replace(/\D/g, '') : raw;
      this.$emit('input', this.inputValue);
    }
  }
};
</script>
