<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>Welcome to Fantasy Quest Tracker</h1>
  <div id="userPage" v-if="store.state.isLoggedIn == true">
    <h1>Bro is logged in</h1>
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
    <h1>Active quests:</h1>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import db from '@/main.js'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { ref } from 'vue'

const store = useStore()
</script>

<script>
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
  },
  methods: {
    async getItems() {
      const docsSnap = await getDocs(collection(db, 'items'))
      docsSnap.forEach((doc) => {
        console.log(doc.data())
      })
    },
    async getPlayerData() {
      const docSnap = await getDoc(doc(db, 'users', 'xxx@xxx.xxx'))
      const data = docSnap.data()
      characterName.value = data.character_name
      classLevel.value = `${data.class} - Level ${data.level}`
      activeQuests.value = data.active_quests
      goldCoins.value = data.gold_coins
      completedQuests.value = data.completed_quests
      experiencePoints.value = data.experience_points
      updateExperienceWidth(data.experience)
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
</style>
