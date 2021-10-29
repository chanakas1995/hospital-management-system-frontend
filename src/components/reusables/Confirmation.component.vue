<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
    overlay-color="primary"
    overlay-opacity="0.1"
    persistent
  >
    <v-card>
      <v-toolbar dark :color="color" dense flat>
        <v-toolbar-title
          >{{
            type ? type.charAt(0).toUpperCase() + type.slice(1) : ""
          }}
          Confirmation</v-toolbar-title
        >
      </v-toolbar>
      <v-card-text class="pa-4 text-subtitle1 font-weight-medium"
        >Are you sure you want to {{ type }} {{ name }}?</v-card-text
      >
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn :color="color" outlined @click="handleReject" dark>
          <v-icon left>$cancel</v-icon>
          No
        </v-btn>
        <v-btn :color="color" @click="handleConfirm" dark>
          <v-icon left>$check</v-icon>
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Confirmation",
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    name: null,
    type: null,
    color: null,
  }),
  methods: {
    confirm(name, type = "delete", color = "error") {
      this.dialog = true;
      this.name = name;
      this.type = type;
      this.color = color;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    handleConfirm() {
      this.resolve();
      this.dialog = false;
    },
    handleReject() {
      this.reject();
      this.dialog = false;
    },
  },
};
</script>
