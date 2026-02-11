<template>
  <button
    :class="['base-button', variantClass, { 'is-loading': loading }]"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    variant: { type: String, default: 'primary' },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    variantClass() {
      return `base-button--${this.variant}`;
    },
  },
};
</script>
