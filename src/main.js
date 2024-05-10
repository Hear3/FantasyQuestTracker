import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAVh5fwganfPnjEU-OZy7dy0aRlxwJM7pU',
  authDomain: 'fantasy-quest-tracker.firebaseapp.com',
  projectId: 'fantasy-quest-tracker',
  storageBucket: 'fantasy-quest-tracker.appspot.com',
  messagingSenderId: '231963644701',
  appId: '1:231963644701:web:2d8cdc13e5224d5f4407f4'
}

// init firebase
initializeApp(firebaseConfig)
// init firestore
const db = getFirestore()
export default db

const app = createApp(App)

app.use(router)

app.mount('#app')
