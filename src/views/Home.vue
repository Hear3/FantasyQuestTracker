<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>Welcome to Fantasy Quest Tracker</h1>
</template>
<script>
import db from '@/main.js'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useStore } from 'vuex'

const store = useStore()

export default {
  created() {
    // this.getBoots()
    this.getItems()
  },
  methods: {
    async getBoots() {
      const docSnap = await getDoc(doc(db, 'items', 'boots1'))
      console.log(docSnap.data())
    },
    async getItems() {
      const docsSnap = await getDocs(collection(db, 'items'))
      docsSnap.forEach((doc) => {
        console.log(doc.data())
      })
    }
  }
}
</script>
