
<template>
  <div class="au-hero-wrapper">
    <div class="au-hero" :class="[`au-hero--${variant}`, { 'au-hero--disabled': disabled }]">
      <div class="au-hero__content d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between">
        <div>
          <h1 class="au-hero__title">
            {{ bannerTitle.title }} <span class="au-hero__username">{{ userDetails.username }}</span>! 👋
          </h1>
          <p class="au-hero__subtitle">{{ bannerTitle.subtitle }}</p>
        </div>
        <div v-if="userDetails.userVerified" class="au-hero__badge-wrapper mt-4 mt-lg-0">
          <span class="au-hero__badge">
            <i class="bi bi-check-circle me-2"></i>
            Verified User
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AUHERO',
  props: {
    userDetails: {
      type: Object,
      default: () => ({
        username: '',
        userVerified: false,
      }),
      validator: (obj) => typeof obj.username === 'string' && typeof obj.userVerified === 'boolean',
    },
    bannerTitle: {
      type: Object,
      default: () => ({
        title: 'Welcome back!',
        subtitle: 'Ready to send packages or offer transportation?',
      }),
      validator: (obj) => typeof obj.title === 'string' && typeof obj.subtitle === 'string',
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
  },
  data() {
    return {};
  },
};
</script>
