<template>
  <div>
    <div class="d-flex flex-row">
      <div>
        <input
          type="checkbox"
          id="myCheckbox"
          :class="{
            'au-checkbox': true,
            'au-checkbox--checked': checked,
            'au-checkbox--disabled': disabled,
          }"
          v-model="checked"
          name="myCheckbox"
          :disabled="disabled"
          @click="handleCheckboxClick"
          @change="handleCheckboxChange"
        />
      </div>
      <div class="au-checkbox__label">
        <template v-if="label">{{ label }}</template>
        <slot v-else name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AUCHECKBOX',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (val) => ['primary', 'secondary', 'outline'].includes(val),
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
    label: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    handleCheckboxClick() {
      this.$emit('click', this.checked);
    },
    handleCheckboxChange() {
      this.$emit('change', this.checked);
    },
  },
};
</script>
