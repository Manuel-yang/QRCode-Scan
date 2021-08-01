<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>ADD RECORD</b-button>

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
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            required
            v-model="nameValue"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Time"
          label-for="time-input"
          invalid-feedback="Time is required"
        >
         <b-form-timepicker
          v-model="timeValue"
          locale="en">
          </b-form-timepicker>
        </b-form-group>

        <b-form-group
          label="Date"
          label-for="date-input"
          invalid-feedback="您输入的数据有误，请重新输入"
          :state="active"
        >
          <b-form-datepicker
            v-model="dateValue"
            class="mb-2"
          >
          </b-form-datepicker>
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
      nameValue: '',
      timeValue: '',
      dateValue: '',
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
      this.nameState = '';
      this.timeValue = '';
      this.dateValue = '';
      this.data = [];
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },

    handleSubmit() {
      this.data.push(this.nameValue);
      this.data.push(this.timeValue);
      this.data.push(this.dateValue);
      this.$emit('add-record', this.data);
      this.reset();
    },
  },
};
</script>
