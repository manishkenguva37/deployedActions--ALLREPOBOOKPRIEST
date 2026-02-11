```vue
<template>
  <div class="au-table-wrapper">
    <table class="au-table">
      <thead>
        <tr>
          <th v-if="selectable" class="au-table__header au-table__header--select">
            <span></span>
          </th>
          <th
            v-for="column in columns"
            :key="column.key"
            class="au-table__header"
            :class="{ 'au-table__header--sortable': column.sortable }"
            @click="column.sortable && sortBy(column.key)"
          >
            {{ column.label }}
            <span v-if="column.sortable && sortKey === column.key">
              <i :class="`bi bi-caret-${sortOrder === 'asc' ? 'up' : 'down'}-fill`"></i>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in paginatedData"
          :key="row.id"
          class="au-table__row"
          :class="{ 'au-table__row--selected': selectedRow === row.id }"
        >
          <td v-if="selectable" class="au-table__cell au-table__cell--select">
            <AURADIO
              :options="[{ value: row.id, label: '' }]"
              :model-value="selectedRow"
              name="table-selection"
              size="small"
              @update:modelValue="selectRow(row.id)"
            />
          </td>
          <td v-for="column in columns" :key="column.key" class="au-table__cell">
            {{ row[column.key] }}
          </td>
        </tr>
      </tbody>
    </table>
    <AUPAGINATION
      v-if="data.length > pageSize"
      v-model:currentPage="currentPage"
      v-model:pageSize="pageSize"
      :total-items="data.length"
      :page-sizes="pageSizes"
      @page-change="onPageChange"
      @page-size-change="onPageSizeChange"
    />
  </div>
</template>

<script>


export default {
  name: 'AUTABLE',
 
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
      validator: (cols) => cols.every((col) => 'key' in col && 'label' in col),
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 25, 50],
    },
  },
  data() {
    return {
      currentPage: 1,
      selectedRow: null,
      sortKey: '',
      sortOrder: 'asc',
    };
  },
  computed: {
    sortedData() {
      if (!this.sortKey) return this.data;
      return [...this.data].sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.sortedData.slice(start, start + this.pageSize);
    },
  },
  methods: {
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
      this.$emit('sort', { key: this.sortKey, order: this.sortOrder });
    },
    selectRow(id) {
      this.selectedRow = id;
      this.$emit('row-select', id);
    },
    onPageChange(page) {
      this.currentPage = page;
      this.$emit('page-change', page);
    },
    onPageSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.$emit('page-size-change', size);
    },
  },
};
</script>

