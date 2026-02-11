<template>
  <div class="container py-5">
    <div class="row mb-4 gx-3">
      <div class="col-md-6 col-lg-4 mb-3 mb-md-0">
        <div class="au-input-group shadow-sm rounded-pill overflow-hidden">
          <span class="au-input-group-text border-0 ps-3">
            <i class="bi bi-search au-text-muted"></i>
          </span>
          <input
            v-model="searchTerm"
            type="text"
            class="au-input border-0 pe-3 rounded-pill"
            placeholder="Search by location or type..."
            aria-label="Search"
          />
        </div>
      </div>
      <div class="col-md-3 col-lg-3 mb-3 mb-md-0">
        <input
          v-model="filterStartDate"
          type="date"
          class="au-input shadow-sm rounded-pill"
          title="Filter from date"
          aria-label="Start date"
        />
      </div>
      <div class="col-md-3 col-lg-3 mb-3 mb-md-0">
        <input
          v-model="filterEndDate"
          type="date"
          class="au-input shadow-sm rounded-pill"
          title="Filter to date"
          aria-label="End date"
        />
      </div>
      <div class="col-md-12 col-lg-2">
        <button
          class="au-btn au-btn-clear w-100 shadow-sm rounded-pill"
          @click="clearFilters"
        >
          Clear Filters
        </button>
      </div>
    </div>

    <div
      class="d-flex flex-column align-items-center flex-sm-row au-nav-tabs nav-justified mb-4 p-2 au-bg-light rounded-pill shadow-sm"
      id="dashboardTabs"
      role="tablist"
    >
      <li
        v-for="(tab, index) in Tabs"
        :key="index"
        class="list-unstyled au-nav-item"
        role="presentation"
      >
        <a
          :class="['au-nav-link', 'rounded-pill', { active: internalActiveTab === tab.name }]"
          :id="tab.id"
          role="tab"
          :aria-controls="tab.name"
          :aria-selected="internalActiveTab === tab.name"
          @click="selectTab(tab.name)"
        >
          <i :class="tab.icon + ' me-2'"></i> {{ tab.label }}
        </a>
      </li>
    </div>

    <div
      v-for="(table, index) in tabledata"
      :key="index"
      :class="['au-tab-pane', { active: true }]"
      id="all-deliveries"
      role="tabpanel"
    >
      <div class="au-card shadow-sm border-0 rounded-4">
        <div
          class="au-card-header au-bg-primary text-white fw-bold d-flex justify-content-between align-items-center rounded-top-4"
        >
          <span>{{ table.title }}</span>
          <span class="au-badge au-bg-light au-text-primary rounded-pill">{{ table.deliveries.length }}</span>
        </div>
        <div class="au-card-body p-0">
          <div v-if="isLoading" class="text-center p-5">
            <div class="au-spinner" role="status"></div>
            <p class="au-text-muted mt-2">Fetching ...</p>
          </div>
          <div v-else>
            <ul v-if="table.deliveries.length" class="au-list-group">
              
              <li
                v-for="(item, itemIndex) in table.deliveries"
                :key="itemIndex"
                class="au-list-group-item au-list-group-item-action p-4"
              >
               <slot :name="table.title" :data="table">
                  <a
                    href="#"
                    class="text-decoration-none au-text-dark"
                  >
                    <div class="d-flex w-100 justify-content-between">
                      <h6 class="mb-1 fw-bold text-truncate">{{ item.item_type }}</h6>
                      <small class="au-text-muted"
                        >Budget: <span class="fw-bold au-text-success">₹{{ item.budget }}</span></small
                      >
                    </div>
                    <p class="mb-1 au-text-muted small">
                      <i class="bi bi-geo-alt-fill me-1"></i>
                      {{ item.pickup_address }}
                      <i class="bi bi-arrow-right mx-1"></i>
                      {{ item.dropoff_address }}
                    </p>
                    <small class="au-text-secondary">
                      <i class="bi bi-calendar me-1"></i> Pickup Date:
                      {{ item.pickup_date }}
                    </small>
                  </a>
                </slot>
              </li>
            
            </ul>
            <div v-else class="p-4 text-center au-text-muted">
              <i class="bi bi-box-seam display-4 au-text-light"></i>
              <p class="mb-0 mt-2">No delivery requests found. Ready to send something?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AUHV",
  props: {
    Tabs: {
      type: Array,
      required: true,
    },
    activeTab: {
      type: String,
      required: true,
    },
    tabledata: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:activeTab"],
  data() {
    return {
      internalActiveTab: this.activeTab,
      isLoading: false,
      searchTerm: "",
      filterStartDate: "",
      filterEndDate: "",
    };
  },
  computed: {
    
  },
  methods: {
    // This method determines the correct slot name for each item
   
    selectTab(tabName) {
      this.isLoading = true;
      this.$emit("update:activeTab", tabName);
      this.internalActiveTab = tabName;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
    clearFilters() {
      this.searchTerm = "";
      this.filterStartDate = "";
      this.filterEndDate = "";
    },
  },
};
</script>