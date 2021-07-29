<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <router-view />
    <!-- <Table :items="data" @querySigData="querySigData"/>
    <b-modal id="modal-1">
          <div class="m-2" id="qrcode"></div>
    </b-modal>
    <b-button variant="success" @click="getData">TEST</b-button> -->
  </div>
</template>

<script>
import axios from 'axios';
import QRCode from 'qrcodejs2';
// import Table from './components/Table.vue';

const requester = axios.create({ baseURL: 'http://localhost:3000' });

export default {
  name: 'app',
  data() {
    return {
      data: [],
    };
  },
  components: {
    // Table,
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const req = await requester.get('/queryAllData');
      this.data = req.data;
    },
    async querySigData(item) {
      const bridgeId = item.bridge_id.substr(1);
      const url = String(`http://localhost:8080/#/querySigData/${bridgeId}`);
      // document.getElementById('qrcode').innerHTML = '';
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
