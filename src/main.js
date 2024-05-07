import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAVh5fwganfPnjEU-OZy7dy0aRlxwJM7pU',
  authDomain: 'fantasy-quest-tracker.firebaseapp.com',
  projectId: 'fantasy-quest-tracker',
  storageBucket: 'fantasy-quest-tracker.appspot.com',
  messagingSenderId: '231963644701',
  appId: '1:231963644701:web:2d8cdc13e5224d5f4407f4'
}

// Initialize Firebase
initializeApp(firebaseConfig)

const app = createApp(App)

app.use(router)

app.mount('#app')
