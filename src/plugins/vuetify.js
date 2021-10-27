import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";
import icons from "./icons";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.blue.darken3,
        secondary: "#424242",
        accent: colors.blue.accent1,
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        grey: colors.grey.lighten5,
      },
    },
  },
  icons: {
    iconfont: "fa",
    values: icons,
  },
});
