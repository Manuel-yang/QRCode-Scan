<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>ADD RECORD</b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit A Record"
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
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      this.data.push(this.nameValue);
      this.data.push(this.timeValue);
      this.data.push(this.dateValue);
      this.$emit('add-record', this.data);
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing');
      });
    },
  },
};
</script>
