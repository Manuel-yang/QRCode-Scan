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
          invalid-feedback="Date is required"
        >
          <b-form-datepicker
            id="example-datepicker"
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
  },
  watch: {
    valid(newValue) {
      // console.log(newValue);
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
      setTimeout(1000);
      console.log(this.valid);
      // if (this.valid === true) {
      //   console('1');
      //   this.$bvModal.hide('modal-prevent-closing');
      // }
    },
  },
};
</script>
