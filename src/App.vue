<template>
  <nav>
    <li><router-link to="/">Home</router-link></li>
    <li><router-link to="/register">Register</router-link></li>
    <li><router-link to="/sign-in">Sign In</router-link></li>
    <li><router-link to="/feed">Feed</router-link></li>
    <li><button @click="handleSignOut" v-if="isLoggedIn">Sign Out</button></li>
  </nav>
  <RouterView />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter, RouterLink, RouterView } from 'vue-router'
const router = useRouter()
const isLoggedIn = ref(false)
let auth
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
      console.log(user.uid)
    } else {
      isLoggedIn.value = false
    }
  })
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/')
  })
}
</script>

<style>
nav ul,
nav li {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Styling the navigation bar */
nav {
  background-color: #4caf50; /* Green background for visibility */
  padding: 10px 20px; /* Padding around the nav bar */
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Center items vertically */
  justify-content: space-between; /* Space out navigation items */
}

/* Styling individual navigation links */
nav li {
  margin-right: 20px; /* Space between each link */
}

nav a {
  color: #ffffff; /* White text for readability */
  text-decoration: none; /* Remove underline from links */
  font-weight: bold; /* Bold font for better legibility */
}

nav a:hover {
  color: #ddd; /* Light gray color on hover for feedback */
}

/* Style for the sign out button */
button {
  padding: 8px 16px; /* Padding inside the button */
  background-color: #f44336; /* Red background color for the sign-out button */
  border: none; /* No border */
  color: white; /* White text color */
  cursor: pointer; /* Cursor indicates clickable */
  border-radius: 4px; /* Rounded corners for aesthetics */
}

button:hover {
  background-color: #c0392b; /* Darker shade on hover */
}
h1 {
  color: #333; /* Dark grey color for the header */
  font-size: 24px; /* Set font size for headers */
  text-align: center; /* Center-align the heading */
}

/* Style for input fields to make them more appealing */
input[type='text'],
input[type='password'] {
  width: 100%; /* Full width to fill the container */
  padding: 8px; /* Adequate padding for typing comfort */
  margin: 8px 0; /* Margin for spacing out elements */
  box-sizing: border-box; /* Include padding and border in the width */
  border: 2px solid #ccc; /* Light grey border */
  border-radius: 4px; /* Rounded borders for modern look */
}

input[type='text']:focus,
input[type='password']:focus {
  border-color: #4caf50; /* Highlight focus with a green border */
  outline: none; /* Remove default focus outline */
}

/* Styling the buttons to match the navigation styling but with differentiation */
button {
  padding: 10px 20px; /* Padding for better touch area */
  margin-top: 10px; /* Extra space above the button */
  border: none; /* No borders */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Pointer to indicate clickable */
  font-weight: bold; /* Bold text */
  color: white; /* White text */
  background-color: #4caf50; /* Consistent green background with nav */
  width: 100%; /* Full width buttons */
}

button:hover {
  background-color: #45a049; /* Slightly darker green on hover */
}

/* Specific styles for the Google sign-in to differentiate from normal submit */
button[onclick*='signInWithGoogle'] {
  background-color: #dd4b39; /* Google's brand red color */
}

button[onclick*='signInWithGoogle']:hover {
  background-color: #c23321; /* Darker red on hover */
}
</style>
