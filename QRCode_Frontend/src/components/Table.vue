<template>
  <b-container fluid>
    <!-- Main table element -->
    <b-table
      :items="items"
      :fields="fields"
      stacked="md"
      selectable
      :select-mode="selectMode"
      @row-clicked='onRowClicked'
    >
      <template #cell(actions)="row">
        <b-button
          v-b-modal.modal-1 size="md"
          @click="$emit('generateQRCode', row.item)"
          class="m-2">
          Generate QRCode
        </b-button>
        <b-button size="md" @click="row.toggleDetails" class="ml-2">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  props: {
    items: Array,
  },
  data() {
    return {
      fields: [
        { key: 'id', label: 'ID', sortDirection: 'desc' },
        { key: 'location', label: '所属地', class: 'text-center' },
        { key: 'bridge_id', label: '桥梁编号', sortDirection: 'desc' },
        { key: 'actions', label: 'Actions' },
      ],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      selectMode: 'single',
    };
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    resetInfoModal() {
      this.infoModal.title = '';
      this.infoModal.content = '';
    },
    onRowClicked(item) {
      this.$emit('delete-bridge', item.id);
    },
  },
};
</script>
