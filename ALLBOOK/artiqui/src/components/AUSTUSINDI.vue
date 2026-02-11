<template>
  <div class="verification-card animate__animated animate__fadeInLeft animate__delay-0-2s">
    <div v-if="CLABEl" class="verification-card-header">
      <h6 class="title">
        <i class="bi bi-shield-check-fill icon-primary"></i> {{ CLABEl }}
      </h6>
    </div>

    <div class="verification-card-body">
      <div class="progress-section">
        <small class="progress-labels">
          <span>{{ CPROLABEL || 'Overall Progress' }}</span>
          <span>{{ Math.round(verificationProgress) }}%</span>
        </small>

        <div class="progress-track">
          <div
            class="progress-fill"
            :style="'width: ' + verificationProgress + '%'"
            :aria-valuenow="verificationProgress"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>

      <ul class="verification-list">
        <li
          v-for="(label) in verificationLabels"
          :key="label.label"
          class="verification-item"
        >
          <div class="verification-item-left">
            <i
              :class="label.isVerified ? 'bi-check-circle-fill icon-verified' : 'bi-exclamation-circle-fill icon-pending'"
            ></i>
            <span class="label-text">{{ label.label }}</span>
          </div>
          <span
            class="status-badge"
            :class="label.isVerified ? 'badge-verified' : 'badge-pending'"
          >
            {{ label.isVerified ? 'Verified' : 'Pending' }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerificationStatus',
  props: {
    CLABEl: { type: String },
    CPROLABEL: { type: String },
    verificationLabels: { type: Array, required: true }
  },
  computed: {
    verificationProgress() {
      const total = this.verificationLabels.length;
      const verified = this.verificationLabels.filter(label => label.isVerified).length;
      return (verified / total) * 100;
    }
  }
};
</script>

