<template>
  <v-row justify="center">
    <v-dialog :value="openPopup" persistent max-width="800">
      <PatientForm
        type="Edit"
        :handleSave="handleSave"
        :handleClose="handleClose"
        :patientData="formData"
      />
    </v-dialog>
  </v-row>
</template>

<script>
import PatientModel from "../../models/Patient.model";
import patientService from "../../services/patient.service";
import PatientForm from "../reusables/forms/PatientForm.component.vue";
export default {
  name: "EditPatient",
  components: { PatientForm },
  data: () => ({
    formData: { ...PatientModel },
  }),
  props: ["handleUpdateComplete", "handleClose", "patientData"],
  watch: {
    patientData() {
      if (this.patientData) {
        this.formData = { ...this.patientData };
      } else {
        Object.assign(this.$data, this.$options.data());
      }
    },
  },
  computed: {
    openPopup() {
      return this.patientData;
    },
  },
  methods: {
    handleSave(formData) {
      patientService
        .update(this.patientData.uuid, formData)
        .then((response) => {
          this.handleUpdateComplete(response.data);
          this.$store.commit("common/OPEN_CREATE_PATIENT_POPUP", false);
        })
        .catch(() => {});
    },
  },
};
</script>
