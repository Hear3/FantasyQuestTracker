<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="block">
    <img src="@/assets/interface/banner.png" alt="banner" />
  </div>
  <div class="block">
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signInWithGoogle">Register With Google</button></p>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { useRouter } from 'vue-router'
import db from '@/main.js'
import { doc, setDoc } from 'firebase/firestore'
const email = ref('')
const password = ref('')
const router = useRouter()
const register = () => {
  const auth = getAuth()
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log('Successfully registered!')
      console.log(data)
      console.log(auth.currentUser)
      setDoc(doc(db, 'users', email.value), {
        email: email.value,
        items: []
      })
      router.push('/')
    })
    .catch((error) => {
      console.log(error.code)
      alert(error.message)
    })
}
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user)
      router.push('/feed')
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>
<style>
.block {
  width: 50%;
  float: left;
  box-sizing: border-box;
  padding: 20px;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
