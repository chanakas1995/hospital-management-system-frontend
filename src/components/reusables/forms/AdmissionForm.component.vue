<template>
  <v-card>
    <v-card-title class="primary--text">
      <v-icon left color="primary" size="20">$admission</v-icon>
      <span class="text-h5">{{ type }} Admission</span>
    </v-card-title>
    <v-divider />
    <v-card-text class="mt-5">
      <v-form ref="form" lazy-validation>
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              v-model="admissionData.patient"
              label="Patient"
              :items="patients"
              item-value="id"
              :item-text="(patient) => `${patient.name} - ${patient.nic}`"
              :rules="[$validator.required(admissionData.patient, 'Patient')]"
              outlined
              dense
              hide-details="auto"
              validate-on-blur
              :readonly="!!admissionData.uuid"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="admissionData.branch"
              label="Branch"
              :items="branches"
              item-value="id"
              item-text="branchName"
              :rules="[$validator.required(admissionData.branch, 'Branch')]"
              outlined
              dense
              hide-details="auto"
              validate-on-blur
              :readonly="!!admissionData.uuid"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="admissionData.ward"
              label="Ward"
              :items="wards"
              item-value="id"
              :item-text="(ward) => `${ward.wardName} - ${ward.doctorInCharge}`"
              :rules="[$validator.required(admissionData.ward, 'Ward')]"
              outlined
              dense
              hide-details="auto"
              validate-on-blur
              :readonly="!!admissionData.uuid"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="admissionData.notes"
              label="Notes"
              outlined
              dense
              hide-details="auto"
              validate-on-blur
              rows="5"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="pb-5">
      <v-spacer />
      <v-btn color="primary" outlined @click="handleCloseClick">
        <v-icon left dark> $cancel </v-icon>Cancel</v-btn
      >
      <v-btn color="primary" @click="handleSaveClick">
        <v-icon left dark> $save </v-icon>Save</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AdmissionForm",
  props: [
    "type",
    "handleClose",
    "handleSave",
    "admissionData",
    "patients",
    "branches",
  ],
  computed: {
    wards() {
      return this.admissionData?.branch
        ? this.branches.find(
            (branch) => branch.id === this.admissionData.branch
          )?.wards || []
        : [];
    },
    branch() {
      return this.admissionData.branch;
    },
  },
  watch: {
    admissionData() {
      this.$refs.form.resetValidation();
    },
    branch(oldValue, newValue) {
      if (oldValue && newValue && oldValue !== newValue) {
        this.admissionData.ward = null;
      }
    },
  },
  methods: {
    handleSaveClick() {
      if (this.$refs.form.validate()) {
        this.handleSave(this.admissionData);
      }
    },
    handleCloseClick() {
      this.$refs.form.resetValidation();
      this.handleClose();
    },
  },
};
</script>
