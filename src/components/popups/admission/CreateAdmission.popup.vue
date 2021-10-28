<template>
  <v-row justify="center">
    <v-dialog :value="open" persistent max-width="800">
      <AdmissionForm
        type="Create"
        :handleSave="handleSave"
        :handleClose="handleCloseClick"
        :admissionData="formData"
        :patients="patients"
        :branches="branches"
      />
    </v-dialog>
  </v-row>
</template>

<script>
import admissionService from "../../../services/admission.service";
import AdmissionForm from "../../reusables/forms/AdmissionForm.component.vue";
import AdmissionModel from "../../../models/Admission.model";
export default {
  name: "CreateAdmission",
  components: { AdmissionForm },
  props: ["handleSaveComplete", "handleClose", "open", "patients", "branches"],
  data: () => ({
    formData: { ...AdmissionModel },
  }),
  methods: {
    handleSave(formData) {
      admissionService
        .save(formData)
        .then((response) => {
          this.handleSaveComplete(response.data);
          this.handleCloseClick();
        })
        .catch(() => {});
    },
    handleCloseClick() {
      Object.assign(this.$data, this.$options.data());
      this.handleClose();
    },
  },
};
</script>
