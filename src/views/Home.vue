<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <br />
  <h1>Embark on an epic quest with Fantasy Quest Tracker!</h1>
  <br />
  <div id="userPage" v-if="store.state.isLoggedIn == true">
    <div id="userPanel">
      <div id="leftUserPanel">
        <Character />
      </div>
      <div id="rightUserPanel">
        <h2>
          <b>{{ characterName }}</b>
        </h2>
        <h2>{{ classLevel }}</h2>
        <h2>Active Quests: {{ activeQuests }}</h2>
        <br />
        <h2>Completed Quests: {{ completedQuests }}</h2>
        <br />
        <h2>Gold Coins: {{ goldCoins }}</h2>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1>Experience Points: {{ experiencePoints }}</h1>
        <div class="experience-bar">
          <div class="experience-fill" :style="{ '--experience-width': experienceWidth }"></div>
        </div>
      </div>
    </div>
    <div v-for="quest in questItems" :key="quest.quest_name">
      <Quest :item="quest" @delete="handleDeleteQuest" />
    </div>
    <br />
  </div>
</template>

<script setup>
import Quest from '@/components/Quest.vue'
import { useStore } from 'vuex'
import db from '@/main.js'
import { collection, doc, setDoc, getDoc, getDocs, deleteDoc } from 'firebase/firestore'
import Character from '@/components/Character.vue'

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
let userEmail = ''
export default {
  components: {
    Quest
  },
  data() {
    return {
      questItems: []
    }
  },
  created() {
    this.getPlayerData()
  },
  methods: {
    async getPlayerData() {
      const store = useStore()
      userEmail = store.state.userEmail
      const docSnap = await getDoc(doc(db, 'users', userEmail))
      const data = docSnap.data()
      console.log(data)
      const colSnap = await getDocs(collection(db, 'users', userEmail, 'quests'))
      activeQuests.value = 0
      colSnap.forEach((doc) => {
        const questData = doc.data()
        const questId = doc.id // questId is a string
        questData.id = questId
        this.questItems.push(questData)
        activeQuests.value += 1
      })
      console.log(this.questItems)
      characterName.value = data.character_name
      classLevel.value = `${data.class} - Level ${data.level}`
      goldCoins.value = data.gold_coins
      completedQuests.value = data.completed_quests
      experiencePoints.value = data.experience_points
      updateExperienceWidth(data.experience)
    },
    async handleDeleteQuest(quest) {
      const oldQuestId = quest.id
      const oldQuestName = quest.quest_name
      const oldQuestDifficulty = quest.difficulty
      const oldQuestRewardGold = quest.reward_gold
      const oldQuestRewardXp = quest.reward_xp
      const oldQuestTimeToComplete = quest.time_to_complete
      const oldQuestDesc = quest.desc

      await deleteDoc(doc(db, 'users', userEmail, 'quests', oldQuestId))

      const userRef = doc(db, 'users', userEmail)
      const userSnap = await getDoc(userRef)
      let newLvlValue = userSnap.data().level
      const newQuestAmount = userSnap.data().completed_quests + 1
      const newGoldAmount = userSnap.data().gold_coins + quest.reward_gold
      let newXPAmount = userSnap.data().experience_points + quest.reward_xp

      if (newXPAmount >= 100) {
        newXPAmount -= 100
        newLvlValue += 1
      }

      await setDoc(
        userRef,
        {
          completed_quests: newQuestAmount,
          experience: newXPAmount,
          experience_points: newXPAmount,
          gold_coins: newGoldAmount,
          level: newLvlValue
        },
        { merge: true }
      )

      await setDoc(doc(db, 'users', userEmail, 'completed_quests', oldQuestId), {
        quest_name: oldQuestName,
        difficulty: oldQuestDifficulty,
        reward_xp: oldQuestRewardXp,
        reward_gold: oldQuestRewardGold,
        time_to_complete: oldQuestTimeToComplete,
        desc: oldQuestDesc
      })
      window.location.reload()
    }
  }
}
</script>
<style>
#userPanel {
  background-color: rgb(223, 223, 233);
  padding: 15px;
  display: flex;
  height: 100%;
  border-radius: 15px;
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
  height: 40px;
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
  color: #5b92e5;
  text-align: center;
  margin-bottom: 16px;
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

h2 {
  color: #5b92e5;
  margin-bottom: 16px;
}
</style>
