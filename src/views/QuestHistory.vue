<template>
  <div>
    <h1>This is the history of your journey</h1>

    <h2>Your Story:</h2>
    <ul>
      <li v-for="quest in questItems" :key="quest.quest_name">
        <CompletedQuest :item="quest" />
      </li>
      <div v-for="quest in questItems" :key="quest.quest_name"></div>
    </ul>

    <div class="footer">Footer content</div>
  </div>
</template>
<script setup>
import CompletedQuest from '@/components/CompletedQuest.vue'
import { useStore } from 'vuex'
import db from '@/main.js'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
</script>
<script>
let userEmail = ''
export default {
  components: {
    CompletedQuest
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
      const colSnap = await getDocs(collection(db, 'users', userEmail, 'completed_quests'))
      colSnap.forEach((doc) => {
        const questData = doc.data()
        const questId = doc.id
        questData.id = questId
        this.questItems.push(questData)
      })
    }
  }
}
</script>

<style scoped>
h1 {
  color: #5b92e5;
  text-align: center;
  margin-bottom: 16px;
}
.footer {
  width: 100%;
  background-color: rgb(132, 134, 134);
  padding: 2px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #f3f3f3;
  margin: 8px 0;
  padding: 8px;
  border-radius: 4px;
}
</style>
