import Vue from "vue";
import Vuetify from "vuetify";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: colors.blue.darken2,
        secondary: colors.purple.darken2,
        accent: colors.grey.darken2,
        error: colors.red.darken2,
        info: colors.cyan.darken2,
        success: colors.green.darken2,
        warning: colors.amber.darken2
      },
      light: {
        primary: colors.blue.base,
        secondary: colors.purple.base,
        accent: colors.grey.base,
        error: colors.red.base,
        info: colors.cyan.base,
        success: colors.green.base,
        warning: colors.amber.base
      }
    }
  }
});
