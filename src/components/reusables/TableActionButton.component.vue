<template>
  <v-btn
    :color="color || 'primary'"
    icon
    outlined
    class="mr-1 router-link"
    :to="to || undefined"
    @click="handleClick ? handleClick(item) : undefined"
  >
    <v-icon small> ${{ icon }} </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "TableActionButton",
  props: ["to", "handleClick", "item", "icon", "color"],
};
</script>
