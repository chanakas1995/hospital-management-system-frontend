<template>
  <v-app>
    <v-navigation-drawer app color="grey" clipped v-model="openDrawer">
      <side-menu />
    </v-navigation-drawer>

    <v-app-bar app color="primary" clipped-left dense dark>
      <v-icon class="mr-3">$hospital</v-icon>
      <v-toolbar-title>ABC Hospitals</v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon
        @click="openDrawer = !openDrawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main class="mb-15">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <v-spacer />
      <span class="primary--text">
        ABC Hospitals - Hospital Management System -
        {{ $moment().format("YYYY") }}
      </span>
      <v-spacer />
    </v-footer>
    <v-snackbar
      v-if="message"
      v-model="snackbar"
      bottom
      :color="message.type"
      right
      app
    >
      <v-icon class="mr-3">
        ${{
          message.type === "success" ? "checkCircle" : "timesCircle"
        }} </v-icon
      >{{ message.text }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon size="16">$times</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-overlay :value="overlay" z-index="1500">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import SideMenu from "./components/general/SideMenu.component.vue";
export default {
  name: "App",
  components: { SideMenu },
  data() {
    return {
      openDrawer: !this.$vuetify.breakpoint.mobile,
      snackbar: false,
    };
  },
  computed: {
    message() {
      return this.$store.state.common.message;
    },
    overlay() {
      return this.$store.state.common.pendingRequestsCount;
    },
  },
  watch: {
    message() {
      this.snackbar = true;
    },
  },
};
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}
.router-link {
  text-decoration: none;
}
.router-link:hover {
  text-decoration: none;
}
.v-navigation-drawer__content::-webkit-scrollbar {
  display: none;
}
</style>
