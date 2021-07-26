<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Table :items="data"/>
      <b-button variant="success" @click="getData">TEST</b-button>
  </div>
</template>

<script>
import axios from 'axios';
import Table from './components/Table.vue';

const requester = axios.create({ baseURL: 'http://localhost:3000' });

export default {
  name: 'app',
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
      const req = await requester.get('/test');
      this.data = req.data;
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
