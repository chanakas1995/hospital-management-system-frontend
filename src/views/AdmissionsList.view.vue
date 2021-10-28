<template>
  <div>
    <ItemManagement
      :items="items"
      :headers="headers"
      title="Admissions Management"
      icon="admission"
      :handleAddNew="handleAddNew"
    >
      <template v-slot:patientName="{ item }">
        {{ item.patient.name }}
      </template>
      <template v-slot:patientNic="{ item }">
        {{ item.patient.nic }}
      </template>
      <template v-slot:branchName="{ item }">
        {{ item.branch.branchName }}
      </template>
      <template v-slot:wardName="{ item }">
        {{ item.ward.wardName }}
      </template>
      <template v-slot:actions="{ item }">
        <TableActionButton :handleClick="handleEdit" :item="item" icon="edit" />
        <TableActionButton
          :handleClick="handleDelete"
          :item="item"
          icon="delete"
        />
      </template>
    </ItemManagement>
    <DeleteConfirmation ref="deleteConfirmation" />
    <CreateAdmission
      :open="openCreateNew"
      :handleClose="handleClose"
      :handleSaveComplete="handleSaveComplete"
      :patients="patients"
      :branches="branches"
    />
    <EditAdmission
      :handleUpdateComplete="handleUpdateComplete"
      :handleClose="handleClose"
      :admissionData="selectedItem"
      :patients="patients"
      :branches="branches"
    />
    <CreatePatient :handleSaveComplete="handleSavePatientComplete" />
    <v-speed-dial right bottom fixed absolute open-on-hover>
      <template v-slot:activator>
        <v-btn color="primary" fab>
          <v-icon>$plus</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="primary" @click="openCreatePatientPopup">
        <v-icon>$patient</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import ItemManagement from "../components/reusables/ItemManagement.component.vue";
import patientService from "../services/patient.service";
import branchService from "../services/branch.service";
import DeleteConfirmation from "../components/reusables/DeleteConfirmation.component.vue";
import TableActionButton from "../components/reusables/TableActionButton.component.vue";
import CreatePatient from "../components/popups/patient/CreatePatient.popup.vue";
import CreateAdmission from "../components/popups/admission/CreateAdmission.popup.vue";
import EditAdmission from "../components/popups/admission/EditAdmission.popup.vue";
import admissionService from "../services/admission.service";

export default {
  name: "AdmissionsList",
  components: {
    ItemManagement,
    DeleteConfirmation,
    TableActionButton,
    CreateAdmission,
    EditAdmission,
    CreatePatient,
  },
  data() {
    return {
      headers: [
        { text: "Patient", value: "patientName" },
        { text: "NIC", value: "patientNic" },
        { text: "Branch", value: "branchName" },
        { text: "Ward", value: "wardName" },
        { text: "Notes", value: "notes" },
        { text: "Actions", value: "actions", width: 120, sortable: false },
      ],
      items: [],
      branches: [],
      patients: [],
      selectedItem: null,
      openCreateNew: false,
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    patientPopup() {
      return this.$store.state.common.popups.createPatientPopup;
    },
  },
  watch: {
    patientPopup() {
      if (!this.patientPopup) {
        this.loadPatients();
      }
    },
  },
  methods: {
    init() {
      this.loadPatients();
      this.loadBranches();
      this.loadAdmissions();
    },
    loadAdmissions() {
      admissionService
        .getAll()
        .then((response) => {
          this.items = response.data;
        })
        .catch(() => {});
    },
    loadPatients() {
      patientService
        .getOptions()
        .then((response) => {
          this.patients = response.data;
        })
        .catch(() => {});
    },
    loadBranches() {
      branchService
        .getOptions()
        .then((response) => {
          this.branches = response.data;
        })
        .catch(() => {});
    },
    handleAddNew() {
      this.openCreateNew = true;
    },
    handleDelete(item) {
      this.$refs.deleteConfirmation
        .confirm(`${item.patient.name}'s admission`)
        .then(() => {
          admissionService.delete(item.uuid).then(() => {
            this.init();
          });
        })
        .catch(() => {});
    },
    openCreatePatientPopup() {
      this.$store.commit("common/OPEN_CREATE_PATIENT_POPUP", true);
    },
    handleEdit(item) {
      this.selectedItem = item;
    },
    handleSaveComplete(admission) {
      this.items.push(admission);
    },
    handleSavePatientComplete() {
      this.loadPatients();
    },
    handleUpdateComplete(admission) {
      const item = this.items.find((item) => item.uuid === admission.uuid);
      Object.assign(item, admission);
      this.selectedItem = null;
    },
    handleClose() {
      this.openCreateNew = false;
      this.selectedItem = null;
    },
  },
};
</script>
