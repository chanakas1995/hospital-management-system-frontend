<template>
  <v-row justify="center">
    <v-dialog :value="openPopup" persistent max-width="800">
      <AdmissionForm
        type="Edit"
        :handleSave="handleSave"
        :handleClose="handleClose"
        :admissionData="formData"
        :patients="patients"
        :branches="branches"
      />
    </v-dialog>
  </v-row>
</template>

<script>
import AdmissionModel from "../../../models/Admission.model";
import admissionService from "../../../services/admission.service";
import AdmissionForm from "../../reusables/forms/AdmissionForm.component.vue";
export default {
  name: "EditAdmission",
  components: { AdmissionForm },
  data: () => ({
    formData: { ...AdmissionModel },
  }),
  props: [
    "handleUpdateComplete",
    "handleClose",
    "admissionData",
    "patients",
    "branches",
  ],
  watch: {
    admissionData() {
      if (this.admissionData) {
        this.formData = {
          ...this.admissionData,
          patient: this.admissionData.patient.id,
          branch: this.admissionData.branch.id,
          ward: this.admissionData.ward.id,
        };
      } else {
        Object.assign(this.$data, this.$options.data());
      }
    },
  },
  computed: {
    openPopup() {
      return this.admissionData;
    },
  },
  methods: {
    handleSave(formData) {
      admissionService
        .update(this.admissionData.uuid, formData)
        .then((response) => {
          this.handleUpdateComplete(response.data);
          this.handleClose();
        })
        .catch(() => {});
    },
  },
};
</script>
