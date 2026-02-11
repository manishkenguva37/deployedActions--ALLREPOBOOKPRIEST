<template>
  <label class="base-toggle">
    <input type="checkbox" :checked="value" @change="$emit('change', $event.target.checked)" />
    <span class="slider"></span>
  </label>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
};
</script>
