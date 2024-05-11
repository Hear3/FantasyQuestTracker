<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <h1>Add Quest</h1>
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
export default {
  created() {
    this.getUserData()
  },
  methods: {
    async getUserData() {
      const store = useStore()
      const docSnap = await getDoc(doc(db, 'users', store.state.userEmail))
      const data = docSnap.data()
      console.log(data.email)
      return data.email
    },
    async uploadQuest() {
      console.log('Adding quest...')
      await addDoc(collection(db, 'users', 'xxx@xxx.xxx', 'quests'), {
        quest_name: quest_name.value,
        difficulty: difficulty.value,
        reward_xp: reward_xp.value,
        reward_gold: reward_gold.value,
        time_to_complete: time_to_complete.value,
        desc: description.value
      })
      alert('Dodano zadanie!')
    }
  }
}
</script>
