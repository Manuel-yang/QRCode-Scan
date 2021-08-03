<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <AddBridge
            @add-bridge="addBridge"
            :valid="valid"
            :active="active"
          />
        </b-col>
        <b-col>
          <b-button @click="DeleteBridge">DELETE BRIDGE</b-button>
        </b-col>
      </b-row>
    </b-container>
    <Table
      @delete-bridge="deleteBridge"
      :items="data"
      @generateQRCode="generateQRCode"
    />

    <b-modal id="modal-1">
      <div class="m-2" id="qrcode"></div>
      <router-link :to="this.url">{{ this.url }}</router-link>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import QRCode from 'qrcodejs2';
import Table from '../components/Table.vue';
import AddBridge from '../components/AddBridge.vue';

const requester = axios.create({ baseURL: 'http://localhost:3000' });

export default {
  name: 'queryAllData',
  data() {
    return {
      data: [],
      valid: false,
      active: true,
      id: null,
      url: null,
    };
  },
  components: {
    Table,
    AddBridge,
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
      this.url = String(`querySigData/${bridgeId}`);
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
    async addBridge(data) {
      await requester.post('/DBOpt/addBridge', { data })
        .then((res) => {
          if (res.status === 200) {
            this.valid = true;
            this.getData();
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 406) {
            this.active = false;
          }
        });
    },
    async deleteBridge(id) {
      this.id = id;
    },
    async DeleteBridge() {
      await requester.post('/DBOpt/deleteBridge', [this.id])
        .then((res) => {
          if (res.status === 200) {
            this.getData();
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 406) {
            console.log(error);
          }
        });
    },
  },
};
</script>
