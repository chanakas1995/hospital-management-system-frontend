<template>
  <div>
    <ItemManagement
      :items="items"
      :headers="headers"
      title="Patients Management"
      icon="patient"
      :handleAddNew="handleAddNew"
    >
      <template v-slot:actions="{ item }">
        <TableActionButton
          :handleClick="handleEdit"
          :item="item"
          icon="edit"
          color="success"
        />
        <TableActionButton
          :handleClick="handleDelete"
          :item="item"
          icon="delete"
          color="error"
        />
      </template>
    </ItemManagement>
    <Confirmation ref="confirmation" />
    <CreatePatient :handleSaveComplete="handleSaveComplete" />
    <EditPatient
      :handleUpdateComplete="handleUpdateComplete"
      :handleClose="handleClose"
      :patientData="selectedPatient"
    />
  </div>
</template>

<script>
import ItemManagement from "../components/reusables/ItemManagement.component.vue";
import patientService from "../services/patient.service";
import Confirmation from "../components/reusables/Confirmation.component.vue";
import TableActionButton from "../components/reusables/TableActionButton.component.vue";
import CreatePatient from "../components/popups/patient/CreatePatient.popup.vue";
import EditPatient from "../components/popups/patient/EditPatient.popup.vue";

export default {
  name: "PatientList",
  components: {
    ItemManagement,
    Confirmation,
    TableActionButton,
    CreatePatient,
    EditPatient,
  },
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Address", value: "address" },
        { text: "Mobile", value: "mobile" },
        { text: "Date Of Birth", value: "dateOfBirth" },
        { text: "NIC", value: "nic" },
        { text: "Gender", value: "gender" },
        { text: "Blood Group", value: "bloodGroup" },
        { text: "Actions", value: "actions", width: 120, sortable: false },
      ],
      items: [],
      selectedPatient: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      patientService
        .getAll()
        .then((response) => {
          this.items = response.data;
        })
        .catch(() => {});
    },
    handleDelete(item) {
      this.$refs.confirmation
        .confirm(item.name)
        .then(() => {
          patientService.delete(item.uuid).then(() => {
            this.init();
          });
        })
        .catch(() => {});
    },
    handleAddNew() {
      this.$store.commit("common/OPEN_CREATE_PATIENT_POPUP", true);
    },
    handleEdit(item) {
      this.selectedPatient = item;
    },
    handleSaveComplete(patient) {
      this.items.push(patient);
    },
    handleUpdateComplete(patient) {
      const item = this.items.find((item) => item.uuid === patient.uuid);
      Object.assign(item, patient);
      this.selectedPatient = null;
    },
    handleClose() {
      this.selectedPatient = null;
    },
  },
};
</script>
