<template>
  <button
    :class="['au-button', `au-button--${variant}`, `au-button--${size}`, { 'au-button--disabled': disabled, 'au-button--loading': loading, 'au-button--outline': outline }]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="au-button__spinner"></span>
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'AUButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (val) => ['primary', 'secondary'].includes(val), // 'outline' is now a separate prop
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
    loading: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Button',
    },
    outline: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

