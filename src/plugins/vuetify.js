import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#6da2f9',
        secondary: '#37a0cf',
        accent: '#005CAF',
        error: '#FF5252',
        info: '#4285f4',
        success: '#55A7A0',
        warning: '#FFC107'
      },
    },
  },
  icons: {
    iconfont: 'md',
  },
});
