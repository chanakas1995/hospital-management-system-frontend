<template>
  <v-card>
    <v-card-title class="primary--text">
      <v-icon left color="primary" size="20">$patient</v-icon>
      <span class="text-h5">{{ type }} Patient</span>
    </v-card-title>
    <v-divider />
    <v-card-text class="mt-5">
      <v-form ref="form" lazy-validation>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="patientData.name"
              label="Name"
              :rules="[$validator.required(patientData.name, 'Name')]"
              outlined
              dense
              hide-details="auto"
              validate-on-blur
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="patientData.nic"
              label="NIC"
              :rules="[$validator.nic(patientData.nic, 'NIC')]"
              outlined
              dense
              hide-details="auto"
              validate-on-blur
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-menu
              v-model="dateSelector"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="patientData.dateOfBirth"
                  label="Date of birth"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="[
                    $validator.required(
                      patientData.dateOfBirth,
                      'Date of birth'
                    ),
                    $validator.pastOrEqualDate(
                      patientData.dateOfBirth,
                      'Date of birth'
                    ),
                  ]"
                  outlined
                  dense
                  hide-details="auto"
                  validate-on-blur
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="patientData.dateOfBirth"
                @input="dateSelector = false"
                :max="$moment().format('YYYY-MM-DD')"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="patientData.email"
              label="Email"
              :rules="[$validator.email(patientData.email, 'Email')]"
              outlined
              dense
              hide-details="auto"
              validate-on-blur
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="patientData.mobile"
              label="Mobile"
              :rules="[
                $validator.required(patientData.mobile, 'Mobile'),
                $validator.phoneNumber(patientData.mobile, 'Mobile'),
              ]"
              outlined
              dense
              hide-details="auto"
              validate-on-blur
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="patientData.gender"
              label="Gender"
              :items="genders"
              :rules="[$validator.required(patientData.gender, 'Gender')]"
              outlined
              dense
              hide-details="auto"
              validate-on-blur
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="patientData.bloodGroup"
              label="Blood Group"
              :items="bloodGroups"
              :rules="[
                $validator.required(patientData.bloodGroup, 'Blood Group'),
              ]"
              outlined
              dense
              hide-details="auto"
              validate-on-blur
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="patientData.address"
              label="Address"
              :rules="[$validator.required(patientData.address, 'Address')]"
              outlined
              dense
              hide-details="auto"
              validate-on-blur
              rows="3"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="patientData.contactPersonName"
              label="Contact person name"
              :rules="[
                $validator.required(
                  patientData.contactPersonName,
                  'Contact person name'
                ),
              ]"
              outlined
              dense
              hide-details="auto"
              validate-on-blur
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="patientData.contactPersonEmail"
              label="Contact person email"
              outlined
              dense
              hide-details="auto"
              validate-on-blur
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="patientData.contactPersonMobile"
              label="Contact person mobile"
              :rules="[
                $validator.required(
                  patientData.contactPersonMobile,
                  'Contact person mobile'
                ),
                $validator.phoneNumber(
                  patientData.contactPersonMobile,
                  'Contact person mobile'
                ),
              ]"
              outlined
              dense
              hide-details="auto"
              validate-on-blur
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
  name: "PatientForm",
  props: ["type", "handleClose", "handleSave", "patientData"],
  data: () => ({
    dateSelector: false,
    genders: ["Male", "Female"],
    bloodGroups: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  }),
  watch: {
    patientData() {
      this.$refs.form.resetValidation();
    },
  },
  methods: {
    handleSaveClick() {
      if (this.$refs.form.validate()) {
        this.handleSave(this.patientData);
      }
    },
    handleCloseClick() {
      this.$refs.form.resetValidation();
      this.handleClose();
    },
  },
};
</script>
