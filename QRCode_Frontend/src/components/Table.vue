<template>
  <b-container fluid>
    <!-- Main table element -->
    <b-table
      :items="items"
      :fields="fields"
      stacked="md"
      show-empty
      small
    >

      <template #cell(actions)="row">
        <b-button v-b-modal.modal-1 size="md" @click="$emit('querySigData', row.item)" class="m-2">
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
        { key: 'maintain_time', label: '维修次数', sortDirection: 'desc' },
        { key: 'bridge_id', label: '桥梁编号', sortDirection: 'desc' },
        { key: 'actions', label: 'Actions' },
      ],
      totalRows: 1,
      currentPage: 1,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
    };
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    // info(item, index, button) {
    // this.infoModal.title = `Row index: ${index}`;
    // this.infoModal.content = JSON.stringify(item, null, 2);
    // this.infoModal.content = JSON.stringify(item);
    //   this.$root.$emit('bv::show::modal', this.infoModal.id, button);
    // },
    resetInfoModal() {
      this.infoModal.title = '';
      this.infoModal.content = '';
    },
  },
};
</script>
