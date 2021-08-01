<template>
  <div>
    <AddRecord @add-record="addRecord" :valid="valid" :active="active"/>
    <b-table stacked :fields="fields" :items="items"></b-table>
    <b-alert variant="success" show class="m-3">检修记录</b-alert>
    <b-table striped hoevr :items="recoderList"></b-table>
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
      recoderList: [],
      fields: [
        { key: 'ID', label: 'ID:', sortDirection: 'desc' },
        { key: 'LOCATION', label: '所属地:', class: 'text-center' },
        { key: 'MAINTAIN_TIME', label: '维修次数:', sortDirection: 'desc' },
        { key: 'BRIDGE_ID', label: '桥梁编号:', sortDirection: 'desc' },
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
      await requester.post(`/addRecord/${this.$route.params.id}`, { newRecord })
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
  },
  mounted() {
    this.query();
  },
};
</script>
