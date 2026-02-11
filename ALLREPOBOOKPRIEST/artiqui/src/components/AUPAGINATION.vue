
<template>
  <div class="au-pagination d-flex align-items-center justify-content-between">
    <div class="d-flex align-items-center">
      <span class="au-pagination__label">Rows per page:</span>
      <select
        v-model="selectedPageSize"
        class="au-pagination__select ms-2"
        :disabled="disabled"
        @change="handlePageSizeChange"
      >
        <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
      </select>
    </div>
    <div class="d-flex align-items-center">
      <button
        class="au-pagination__button"
        :disabled="currentPage === 1 || disabled"
        @click="goToPage(currentPage - 1)"
      >
        <i class="bi bi-chevron-left"></i>
      </button>
      <button
        v-for="page in visiblePages"
        :key="page"
        class="au-pagination__button"
        :class="{ 'au-pagination__button--active': page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <span v-if="showEllipsis" class="au-pagination__ellipsis">...</span>
      <button
        class="au-pagination__button"
        :disabled="currentPage === totalPages || disabled"
        @click="goToPage(currentPage + 1)"
      >
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AUPAGINATION',
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    maxVisiblePages: {
      type: Number,
      default: 5,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 25, 50, 100],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedPageSize: this.pageSize,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.selectedPageSize);
    },
    visiblePages() {
      const pages = [];
      const half = Math.floor(this.maxVisiblePages / 2);
      let start = Math.max(1, this.currentPage - half);
      let end = Math.min(this.totalPages, start + this.maxVisiblePages - 1);

      if (end - start + 1 < this.maxVisiblePages) {
        start = Math.max(1, end - this.maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
    showEllipsis() {
      return this.totalPages > this.maxVisiblePages && this.visiblePages[this.visiblePages.length - 1] < this.totalPages;
    },
  },
  watch: {
    pageSize(newVal) {
      this.selectedPageSize = newVal;
    },
    selectedPageSize(newVal) {
      this.$emit('update:pageSize', newVal);
      this.$emit('page-size-change', newVal);
    },
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('update:currentPage', page);
        this.$emit('page-change', page);
      }
    },
    handlePageSizeChange() {
      this.$emit('page-size-change', this.selectedPageSize);
      this.goToPage(1); // Reset to first page
    },
  },
};
</script>
