<template>
  <div class="base-input">
    <input
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      :readonly="readonly"
    />
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String, default: 'text' },
    value: [String, Number],
    placeholder: String,
    readonly: Boolean,
  },
};
</script>


