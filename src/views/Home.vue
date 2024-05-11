<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>Welcome to Fantasy Quest Tracker</h1>
  <div id="userPage" v-if="store.state.isLoggedIn == true">
    <h1>User is logged in</h1>
    <div id="userPanel">
      <div id="leftUserPanel">
        <img src="@/assets/characters/model1.png" alt="playerModel" />
      </div>
      <div id="rightUserPanel">
        <h2>
          <b>{{ characterName }}</b>
        </h2>
        <h2>{{ classLevel }}</h2>
        <h2>Active Quests: {{ activeQuests }}</h2>
        <h2>Gold Coins: {{ goldCoins }}</h2>
        <h2>Completed Quests: {{ completedQuests }}</h2>
        <h2>Experience Points: {{ experiencePoints }}</h2>
        <div class="experience-bar">
          <div class="experience-fill" :style="{ '--experience-width': experienceWidth }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import db from '@/main.js'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

const store = useStore()
</script>

<script>
import { ref } from 'vue'
const characterName = ref('')
const classLevel = ref('')
const activeQuests = ref(0)
const goldCoins = ref(0)
const completedQuests = ref(0)
const experiencePoints = ref(0)
const experienceWidth = ref('0%')

const updateExperienceWidth = (experience) => {
  const widthPercentage = `${experience}%`
  experienceWidth.value = widthPercentage
}
export default {
  created() {
    this.getItems()
    this.getPlayerData()
    this.getQuestData()
  },
  methods: {
    async getItems() {
      const docsSnap = await getDocs(collection(db, 'items'))
      docsSnap.forEach((doc) => {
        console.log(doc.data())
      })
    },
    async getPlayerData() {
      const store = useStore()
      const docSnap = await getDoc(doc(db, 'users', store.state.userEmail))
      const data = docSnap.data()

      characterName.value = data.character_name
      classLevel.value = `${data.class} - Level ${data.level}`
      activeQuests.value = data.active_quests
      goldCoins.value = data.gold_coins
      completedQuests.value = data.completed_quests
      experiencePoints.value = data.experience_points
      updateExperienceWidth(data.experience)
    },
    async getQuestData() {
      const store = useStore()
      const docSnap = await getDoc(collection(db, 'users', store.state.userEmail, 'quests'))
      const data = docSnap.data()
      console.log(data.email)
    }
  }
}
</script>
<style>
#userPanel {
  background-color: rgb(236, 59, 133);
  padding: 15px;
  display: flex;
  height: 100%;
}
#leftUserPanel {
  flex: 0 0 30%;
  padding: 20px;
}
#leftUserPanel img {
  width: 100%;
  height: auto;
}
#rightUserPanel {
  flex: 1;
  padding: 20px;
  flex-direction: column;
}
#rightUserPanel h2 {
  margin: 10px 0;
}
.experience-bar {
  margin-top: auto;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
}

.experience-fill {
  height: 100%;
  background-color: #4caf50;
  width: var(--experience-width);
  transition: width 1s ease;
}
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: rgb(236, 59, 133);
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 10px;
  font-weight: bold;
  color: rgb(236, 59, 133);
}

input[type='text'],
input[type='number'],
select,
textarea {
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

select {
  width: 100%;
}

textarea {
  height: 100px;
}

#sendButton {
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 4px;
  background-color: rgb(236, 59, 133);
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #c23377;
}
</style>
