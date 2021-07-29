<template>
  <div>
    <b-table stacked :fields="fields" :items="items"></b-table>
    <b-alert variant="success" show class="m-3">检修记录</b-alert>
    <b-table striped hoevr :items="recoderList"></b-table>
  </div>
</template>
<script>
import axios from 'axios';

const requester = axios.create({ baseURL: 'http://localhost:3000' });
export default {
  name: 'showPage',
  data() {
    return {
      id: this.$route.params.id,
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
      this.recoderList = JSON.parse(req.data[0].RECODER);
      console.log(req.data[0].RECODER);
    },
  },
  mounted() {
    this.query();
  },
};
</script>
