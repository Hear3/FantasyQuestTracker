<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <h1>Embark on a Quest!</h1>
    <form @submit.prevent="addQuest">
      <label for="quest-name">Quest Name:</label>
      <input type="text" id="quest-name" v-model="quest_name" />

      <label for="difficulty">Difficulty:</label>
      <select id="difficulty" v-model="difficulty">
        <option value="easy">Easy</option>
        <option value="normal">Normal</option>
        <option value="hard">Hard</option>
        <option value="legendary">Legendary</option>
      </select>

      <label for="reward-exp">Reward (Experience Points):</label>
      <input type="number" id="reward-exp" v-model="reward_xp" />

      <label for="reward-gold">Reward (Gold Coins):</label>
      <input type="number" id="reward-gold" v-model="reward_gold" />

      <label for="time-to-complete">Time to Complete:</label>
      <input type="text" id="time-to-complete" v-model="time_to_complete" />

      <label for="description">Description:</label>
      <textarea id="description" v-model="description"></textarea>

      <button id="sendButton" type="submit" @click="uploadQuest">Add Quest</button>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import db from '@/main.js'
import { collection, doc, getDoc, addDoc } from 'firebase/firestore'
</script>
<script>
const quest_name = ref('')
const difficulty = ref('easy')
const reward_xp = ref(0)
const reward_gold = ref(0)
const time_to_complete = ref('')
const description = ref('')
let userEmail = ''
export default {
  created() {
    this.getUserData()
    const userdata = this.getUserData()
    userdata.then((email) => {
      userEmail = email
    })
  },
  methods: {
    async getUserData() {
      const store = useStore()
      const docSnap = await getDoc(doc(db, 'users', store.state.userEmail))
      const data = docSnap.data()
      return data.email
    },
    async uploadQuest() {
      console.log(userEmail)
      console.log('Adding quest...')
      await addDoc(collection(db, 'users', userEmail, 'quests'), {
        quest_name: quest_name.value,
        difficulty: difficulty.value,
        reward_xp: reward_xp.value,
        reward_gold: reward_gold.value,
        time_to_complete: time_to_complete.value,
        desc: description.value
      })
      alert('Dodano zadanie!')
      window.location.reload()
    }
  }
}
</script>

<style scoped>
div {
  font-family: 'Ubuntu', sans-serif;
  background-color: #f4f4f4;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #5B92E5;
  text-align: center;
  margin-bottom: 16px;
}

label {
  font-size: 14px;
  color: #333;
  margin-top: 10px;
  display: block;
}

input[type="text"],
input[type="number"],
select,
textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}

input[type="text"]:focus,
input[type="number"]:focus,
select:focus,
textarea:focus {
  border-color: #5B92E5;
  outline: none;
}

button#sendButton {
  background-color: #2E8B57;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  width: 100%;
  margin-top: 20px;
  border-radius: 30px;
}

button#sendButton:hover {
  background-color: #276A47;
  
}
</style>

