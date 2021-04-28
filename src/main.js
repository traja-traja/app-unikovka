import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js';
import installElementPlus from './plugins/element'

// firebase
import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID,
    measurementId: process.env.VUE_APP_FIREBASE_MEASURMENT_ID
  };
firebase.initializeApp(firebaseConfig)

const app = createApp(App)
installElementPlus(app)
app.use(router)
app.use(store)

app.mount('#app')