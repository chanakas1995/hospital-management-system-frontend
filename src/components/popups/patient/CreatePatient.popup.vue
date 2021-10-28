<template>
  <v-row justify="center">
    <v-dialog v-model="openPopup" persistent max-width="800">
      <PatientForm
        type="Create"
        :handleSave="handleSave"
        :handleClose="handleClose"
        :patientData="formData"
      />
    </v-dialog>
  </v-row>
</template>

<script>
import patientService from "../../../services/patient.service";
import PatientForm from "../../reusables/forms/PatientForm.component.vue";
import PatientModel from "../../../models/Patient.model";
export default {
  name: "CreatePatient",
  components: { PatientForm },
  props: ["handleSaveComplete"],
  data: () => ({
    formData: { ...PatientModel },
  }),
  computed: {
    openPopup() {
      return this.$store.state.common.popups.createPatientPopup;
    },
  },
  methods: {
    handleSave(formData) {
      patientService
        .save(formData)
        .then((response) => {
          this.handleSaveComplete(response.data);
          this.handleClose();
        })
        .catch(() => {});
    },
    handleClose() {
      Object.assign(this.$data, this.$options.data());
      this.$store.commit("common/OPEN_CREATE_PATIENT_POPUP", false);
    },
  },
};
</script>
