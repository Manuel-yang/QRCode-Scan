<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <AddRecord @add-record="addRecord" :valid="valid" :active="active"/>
        </b-col>
        <b-col>
          <b-button @click="deleteRecord">DELETE RECORD</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-table stacked :fields="fields" :items="items"></b-table>
    <b-alert variant="success" show class="m-3">检修记录</b-alert>
    <b-table
      striped
      hover
      selectable
      :items="recoderList"
      :select-mode="selectMode"
      @row-clicked="onRowClicked"
    >
      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
    </b-table>
  </div>
</template>
<script>
import axios from 'axios';
import AddRecord from '../components/AddRecord.vue';

const requester = axios.create({ baseURL: 'http://localhost:3000' });
export default {
  name: 'querySigData',
  components: {
    AddRecord,
  },
  data() {
    return {
      id: this.$route.params.id,
      valid: false,
      active: true,
      items: [],
      selectMode: 'single',
      recoderList: [],
      fields: [
        { key: 'ID', label: 'ID:', sortDirection: 'desc' },
        { key: 'LOCATION', label: '所属地:', class: 'text-center' },
        { key: 'BRIDGE_ID', label: '桥梁编号:', sortDirection: 'desc' },
        { key: 'COUNT', label: '维修次数:', sortDirection: 'desc' },
      ],
    };
  },
  methods: {
    async query() {
      const req = await requester.get(`/querySigData/${this.$route.params.id}`);
      this.items = req.data;
      this.recoderList = JSON.parse(req.data[0].RECORD);
    },
    async addRecord(newRecord) {
      await requester.post(`/DBOpt/${this.$route.params.id}`, { newRecord })
        .then((res) => {
          if (res.status === 200) {
            this.valid = true;
            this.query();
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 406) {
            this.active = false;
          }
        });
    },
    onRowClicked(item, index) {
      this.selected = index;
    },
    async deleteRecord() {
      await requester.post(`/DBOpt/${this.$route.params.id}/deleteRecord`, [this.selected])
        .then((res) => {
          if (res.status === 200) {
            this.query();
          }
        });
    },
  },
  mounted() {
    this.query();
  },
};
</script>
