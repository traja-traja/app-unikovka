import { createStore } from 'vuex';

import authModule from './modules/auth/index.js';
import appModule from './modules/app/index.js';

const store = createStore({
  modules: {
    auth: authModule,
    app: appModule
  },
  
  state() {
    return {};
  },

  getters: {}
});

export default store;