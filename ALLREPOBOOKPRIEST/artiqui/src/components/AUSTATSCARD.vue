<template>
  <div class="container my-5">
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      <div class="stat-card card h-100 border-0 rounded-5 shadow-lg text-center">
        <div class="glass-overlay"></div>
        <div class="card-body p-4 d-flex flex-column justify-content-center align-items-center position-relative z-1">
          <div
            class="icon-wrapper d-flex align-items-center justify-content-center rounded-circle mb-3"
            :class="iconStyleClass"
          >
            <i :class="`bi ${foundIcon} fs-3`"></i>
          </div>
          <div v-if="value" class="h2 fw-bolder text-dark mb-1">{{ value }}</div>
          <div v-if="label" class="text-secondary small fw-medium text-uppercase ls-1">{{ label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AUSTATSCARD',
  props: {
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    iconStyle: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'solid', 'light', 'dark'].includes(value),
    },
  },
  data() {
    return {
      iconList: [
        { label: 'box', icon: 'bi-box-seam' },
        { label: 'truck', icon: 'bi-truck' },
        { label: 'star', icon: 'bi-star-fill' },
        { label: 'clock', icon: 'bi-clock' },
      ],
    };
  },
  computed: {
    foundIcon() {
      const found = this.iconList.find(item => item.label === this.icon);
      if (!found) {
        console.warn(`Icon with label "${this.icon}" not found in iconList`);
        return 'bi-exclamation-circle';
      }
      return found.icon;
    },
    iconStyleClass() {
      return `icon-wrapper--${this.iconStyle}`;
    },
  },
};
</script>

