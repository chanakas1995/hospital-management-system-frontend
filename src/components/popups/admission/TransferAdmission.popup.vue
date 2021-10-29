<template>
  <v-row justify="center">
    <v-dialog :value="admission" persistent max-width="800">
      <v-card>
        <v-card-title class="primary--text">
          <v-icon left color="primary" size="20">$transfer</v-icon>
          <span class="text-h5">Transfer Patient</span>
        </v-card-title>
        <v-divider />
        <v-card-text class="mt-5">
          <v-form ref="form" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model="formData.patient"
                  label="Patient"
                  :items="patients"
                  item-value="id"
                  :item-text="(patient) => `${patient.name} - ${patient.nic}`"
                  :rules="[$validator.required(formData.patient, 'Patient')]"
                  outlined
                  dense
                  hide-details="auto"
                  validate-on-blur
                  readonly
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="formData.fromBranch"
                  label="From branch"
                  :items="branches"
                  item-value="id"
                  item-text="branchName"
                  :rules="[
                    $validator.required(formData.fromBranch, 'From branch'),
                  ]"
                  outlined
                  dense
                  hide-details="auto"
                  validate-on-blur
                  readonly
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="formData.fromWard"
                  label="From ward"
                  :items="fromWards"
                  item-value="id"
                  :item-text="
                    (ward) => `${ward.wardName} - ${ward.doctorInCharge}`
                  "
                  :rules="[$validator.required(formData.fromWard, 'From ward')]"
                  outlined
                  dense
                  hide-details="auto"
                  validate-on-blur
                  readonly
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="formData.toBranch"
                  label="To branch"
                  :items="branches"
                  item-value="id"
                  item-text="branchName"
                  :rules="[$validator.required(formData.toBranch, 'To branch')]"
                  outlined
                  dense
                  hide-details="auto"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="formData.toWard"
                  label="To ward"
                  :items="toWards"
                  item-value="id"
                  :item-text="
                    (ward) => `${ward.wardName} - ${ward.doctorInCharge}`
                  "
                  :rules="[$validator.required(formData.toWard, 'To ward')]"
                  outlined
                  dense
                  hide-details="auto"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="formData.notes"
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
    </v-dialog>
  </v-row>
</template>

<script>
import admissionService from "../../../services/admission.service";
export default {
  name: "TransferAdmission",
  props: [
    "handleSave",
    "handleClose",
    "open",
    "patients",
    "branches",
    "admission",
  ],
  data: () => ({
    formData: {
      admission: null,
      patient: null,
      fromBranch: null,
      fromWard: null,
      toBranch: null,
      toWard: null,
      notes: null,
    },
  }),
  watch: {
    admission() {
      if (this.admission) {
        this.formData = {
          admission: this.admission.uuid,
          patient: this.admission.patient.id,
          fromBranch: this.admission.branch.id,
          fromWard: this.admission.ward.id,
          toBranch: null,
          toWard: null,
          notes: this.admission.notes,
        };
      }
    },
  },
  computed: {
    toWards() {
      return this.formData?.toBranch
        ? this.branches
            .find((branch) => branch.id === this.formData.toBranch)
            ?.wards.filter((ward) => ward.id !== this.formData.fromWard) || []
        : [];
    },
    fromWards() {
      return this.formData?.fromBranch
        ? this.branches.find((branch) => branch.id === this.formData.fromBranch)
            ?.wards || []
        : [];
    },
  },
  methods: {
    handleSaveClick() {
      if (this.$refs.form.validate()) {
        admissionService
          .transfer(this.formData.admission, this.formData)
          .then((response) => {
            this.handleSave(response.data);
            this.handleCloseClick();
          })
          .catch(() => {});
      }
    },
    handleCloseClick() {
      Object.assign(this.$data, this.$options.data());
      this.$refs.form.resetValidation();
      this.handleClose();
    },
  },
};
</script>
