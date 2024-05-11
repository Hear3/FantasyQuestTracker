<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="block">
    <img src="@/assets/interface/banner.png" alt="banner" />
  </div>
  <div class="block">
    <h1>Sign In to an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="register">Submit</button></p>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
const email = ref('')
const password = ref('')
const errMsg = ref()
const router = useRouter()
const register = () => {
  const auth = getAuth()
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log('Successfully signed in!')
      console.log(data)
      console.log(auth.currentUser)
      router.push('/')
    })
    .catch((error) => {
      console.log(error.code)

      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'Invalid email'
          break
        case 'auth/user-not-found':
          errMsg.value = 'No account with that email was found'
          break
        case 'auth/wrong-password':
          errMsg.value = 'Incorrect password'
          break
        default:
          errMsg.value = 'Email or password was incorrect'
          break
      }
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
