<template>
  <textarea
    class="base-textarea"
    :rows="rows"
    :value="value"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    rows: { type: Number, default: 3 },
    value: String,
    placeholder: String,
  },
};
</script>

