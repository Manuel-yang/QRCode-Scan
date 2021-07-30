<template>
  <div>
    <Table :items="data" @generateQRCode="generateQRCode"/>
    <b-modal id="modal-1">
      <div class="m-2" id="qrcode"></div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import QRCode from 'qrcodejs2';
import Table from '../components/Table.vue';

const requester = axios.create({ baseURL: 'http://localhost:3000' });

export default {
  name: 'queryAllData',
  data() {
    return {
      data: [],
    };
  },
  components: {
    Table,
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const req = await requester.get('/queryAllData');
      this.data = req.data;
    },
    async generateQRCode(item) {
      const bridgeId = item.bridge_id.substr(1);
      const url = String(`http://localhost:8080/#/querySigData/${bridgeId}`);
      // this.$nextTick(function () {
      //   this.qrcode(url);
      // });
      setTimeout(() => {
        document.getElementById('qrcode').innerHTML = '';
        this.qrcode(url);
      }, 80);
    },
    qrcode(url) {
      const qrcode = new QRCode('qrcode', {
        width: 124,
        height: 124,
        text: url,
      });
      return qrcode;
    },
  },
};
</script>
