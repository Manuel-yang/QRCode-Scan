<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>ADD Bridge</b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit A Record"
      @show="reset"
      @hidden="reset"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="所属地"
          label-for="name-input"
        >
          <b-form-input
            id="name-input"
            required
            v-model="localValue"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="桥梁编号"
          label-for="name-input"
          :state="active"
          invalid-feedback="Ops! Something goes wrong! Please check the input"
        >
          <b-form-input
            id="name-input"
            required
            v-model="idValue"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameState: null,
      localValue: '',
      idValue: '',
      data: [],
    };
  },
  props: {
    valid: Boolean,
    active: Boolean,
  },
  watch: {
    valid(newValue) {
      if (newValue === true) {
        this.$bvModal.hide('modal-prevent-closing');
      }
    },
  },
  methods: {
    reset() {
      this.localValue = '';
      this.idValue = '';
      this.data = [];
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },

    handleSubmit() {
      this.data.push(this.localValue);
      this.data.push(this.idValue);
      this.$emit('add-bridge', this.data);
      this.reset();
    },
  },
};
</script>
