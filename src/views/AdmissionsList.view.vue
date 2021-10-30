<template>
  <div>
    <ItemManagement
      :items="items"
      :headers="headers"
      title="Admissions Management"
      icon="admission"
      :handleAddNew="handleAddNew"
      sortBy="dischargedDate"
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
      <template v-slot:billAmount="{ item }">
        {{ `Rs.${item.billAmount.toFixed(2)}` }}
      </template>
      <template v-slot:status="{ item }">
        <v-chip :color="item.dischargedDate ? 'success' : 'primary'">
          <v-icon left small class="ml-1">{{
            item.dischargedDate ? "$health" : "$treatment"
          }}</v-icon>
          {{ item.dischargedDate ? "Discharged" : "In Treatments" }}
        </v-chip>
      </template>
      <template v-slot:actions="{ item }">
        <TableActionButton
          :handleClick="handleDischarge"
          :item="item"
          icon="discharge"
          color="purple"
          v-if="!item.dischargedDate"
        />
        <TableActionButton
          :handleClick="handleTransfer"
          :item="item"
          icon="transfer"
          v-if="!item.dischargedDate"
        />
        <TableActionButton
          :handleClick="handleEdit"
          :item="item"
          icon="edit"
          color="success"
          v-if="!item.dischargedDate"
        />
        <TableActionButton
          :handleClick="handleDelete"
          :item="item"
          icon="delete"
          color="error"
          v-if="!item.dischargedDate"
        />
      </template>
    </ItemManagement>
    <Confirmation ref="confirmation" />
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
    <TransferAdmission
      :handleSave="handleTransferComplete"
      :handleClose="handleClose"
      :admission="tranferedItem"
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
      <v-btn fab dark small color="purple" @click="openCreatePatientPopup">
        <v-icon>$patient</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import ItemManagement from "../components/reusables/ItemManagement.component.vue";
import patientService from "../services/patient.service";
import branchService from "../services/branch.service";
import Confirmation from "../components/reusables/Confirmation.component.vue";
import TableActionButton from "../components/reusables/TableActionButton.component.vue";
import CreatePatient from "../components/popups/patient/CreatePatient.popup.vue";
import CreateAdmission from "../components/popups/admission/CreateAdmission.popup.vue";
import EditAdmission from "../components/popups/admission/EditAdmission.popup.vue";
import TransferAdmission from "../components/popups/admission/TransferAdmission.popup.vue";
import admissionService from "../services/admission.service";

export default {
  name: "AdmissionsList",
  components: {
    ItemManagement,
    Confirmation,
    TableActionButton,
    CreateAdmission,
    EditAdmission,
    CreatePatient,
    TransferAdmission,
  },
  data() {
    return {
      headers: [
        { text: "Patient", value: "patientName" },
        { text: "NIC", value: "patientNic" },
        { text: "Branch", value: "branchName" },
        { text: "Ward", value: "wardName" },
        { text: "Notes", value: "notes" },
        { text: "Bill Amount", value: "billAmount", align: "right" },
        {
          text: "Status",
          value: "status",
          align: "center",
        },
        { text: "Actions", value: "actions", width: 240, sortable: false },
      ],
      items: [],
      branches: [],
      patients: [],
      selectedItem: null,
      tranferedItem: null,
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
      this.$refs.confirmation
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
    handleTransfer(item) {
      this.tranferedItem = item;
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
      this.tranferedItem = null;
    },
    handleTransferComplete() {
      this.loadAdmissions();
    },
    handleDischarge(item) {
      this.$refs.confirmation
        .confirm(item.patient.name, "discharge", "purple")
        .then(() => {
          admissionService.discharge(item.uuid).then(() => {
            this.init();
          });
        })
        .catch(() => {});
    },
  },
};
</script>
