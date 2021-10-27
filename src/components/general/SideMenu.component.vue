<template>
  <v-list nav dense rounded>
    <v-list-item-group color="primary">
      <template v-for="group in Object.keys(menus)">
        <v-list-item disabled v-bind:key="group">
          <v-subheader>{{ group }}</v-subheader>
        </v-list-item>
        <v-list-item
          v-for="menu in menus[group]"
          link
          class="router-link"
          :to="{ name: menu.to }"
          v-bind:key="`${group}_${menu.key}`"
        >
          <v-list-item-icon>
            <v-icon size="20" class="mx-auto">{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ menu.label }}</v-list-item-title></v-list-item
        >
        <v-divider v-bind:key="`${group}_divider`" />
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
import menus from "../../utilities/Menus.utility";

export default {
  name: "SideMenu",
  data() {
    return {
      menus: menus,
    };
  },
};
</script>

<style>
.v-navigation-drawer__content::-webkit-scrollbar {
  display: none;
}
</style>
