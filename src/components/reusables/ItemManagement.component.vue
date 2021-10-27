<template>
  <v-card elevation="1">
    <v-card-title v-if="title" class="primary--text">
      <v-icon left color="primary" size="20">${{ icon }}</v-icon>
      <span class="text-h5">{{ title }}</span>
    </v-card-title>
    <v-divider v-if="title" />
    <v-card-title>
      <v-row>
        <v-col>
          <v-text-field
            v-model="search"
            label="Search"
            clear-icon="$clear"
            prepend-inner-icon="$search"
            clearable
            outlined
            dense
          />
        </v-col>
        <v-col cols="auto" v-if="handleAddNew">
          <v-btn color="primary" @click="handleAddNew">
            <v-icon left>$plus</v-icon>
            Add New
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="items"
      :items-per-page="10"
      multi-sort
      :mobile-breakpoint="1000"
      :footer-props="{
        'items-per-page-text': '',
        'show-first-last-page': !$vuetify.breakpoint.mobile,
        'show-current-page': true,
      }"
    >
      <template
        v-for="header in headers"
        v-slot:[getFieldName(header.value)]="{ item }"
      >
        <slot :name="header.value" v-bind:item="item">{{
          item[header.value]
        }}</slot>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "ItemManagementComponent",
  props: ["items", "headers", "icon", "title", "handleAddNew"],
  data() {
    return {
      search: null,
    };
  },
  methods: {
    getFieldName: (field) => `item.${field}`,
  },
};
</script>

<style>
.v-input__icon--prepend-inner > .v-icon,
.v-input__icon--clear > .v-icon {
  font-size: inherit;
}
</style>
