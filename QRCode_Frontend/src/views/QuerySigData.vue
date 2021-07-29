<template>
  <div>
    <b-table stacked :items="items"></b-table>
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
    };
  },
  methods: {
    async query() {
      const req = await requester.get(`/querySigData/${this.$route.params.id}`);
      this.items = req.data;
    },
  },
  mounted() {
    this.query();
  },
};
</script>
